import React, { useState, useEffect, useCallback } from 'react';
import { XMLParser } from 'fast-xml-parser';
import * as rdflib from 'rdflib';
import { CIMVersions } from '../models/CIMVersions';
import { CIMProfiles } from '../models/CIMProfiles';

/**
 * CIMDataHandler component provides functionality for loading, validating,
 * and processing CIM data in different formats (XML/RDF)
 */
const CIMDataHandler = ({ onDataLoaded, selectedVersion, selectedProfile }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cimData, setCimData] = useState(null);
  const [validationResults, setValidationResults] = useState(null);
  const [stats, setStats] = useState({
    totalElements: 0,
    elementsByType: {},
    relationships: 0,
  });

  // Initialize the RDF store and XML parser
  const store = new rdflib.IndexedFormula();
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
  });

  // Handle file upload
  const handleFileUpload = useCallback(
    async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setLoading(true);
      setError(null);

      try {
        const fileContent = await readFileAsText(file);
        const fileExtension = file.name.split('.').pop().toLowerCase();

        let parsedData;
        if (fileExtension === 'xml') {
          parsedData = parseXML(fileContent);
        } else if (fileExtension === 'rdf') {
          parsedData = parseRDF(fileContent);
        } else {
          throw new Error(`Unsupported file format: ${fileExtension}`);
        }

        setCimData(parsedData);
        const results = validateCIM(parsedData);
        setValidationResults(results);

        if (results.valid) {
          calculateStats(parsedData);
          if (onDataLoaded) {
            onDataLoaded(parsedData);
          }
        }
      } catch (err) {
        console.error('Error processing CIM data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [onDataLoaded, selectedVersion, selectedProfile]
  );

  // Read file as text
  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  };

  // Parse XML CIM file
  const parseXML = (xmlContent) => {
    try {
      const parsed = xmlParser.parse(xmlContent);
      return processXMLData(parsed);
    } catch (err) {
      throw new Error(`XML parsing error: ${err.message}`);
    }
  };

  // Process XML data into a standardized format
  const processXMLData = (data) => {
    // Extract the model elements based on the CIM version
    const rootElement = data.rdf_RDF || data['rdf:RDF'] || data;
    const modelElements = {};

    // Process all CIM objects
    Object.entries(rootElement).forEach(([key, value]) => {
      if (key.startsWith('cim:') || key.includes('_')) {
        const elementType = key.replace('cim:', '').replace('rdf_', '');

        // Handle both array and single item cases
        const elements = Array.isArray(value) ? value : [value];

        if (!modelElements[elementType]) {
          modelElements[elementType] = [];
        }

        elements.forEach((element) => {
          if (element) {
            // Extract the ID from rdf:ID or rdf:about attribute
            const id =
              element['@_rdf:ID'] ||
              element['@_rdf:about'] ||
              generateUniqueId();
            modelElements[elementType].push({
              id: id,
              attributes: extractAttributes(element),
              relationships: extractRelationships(element),
            });
          }
        });
      }
    });

    return {
      version: selectedVersion || detectCIMVersion(data),
      profile: selectedProfile,
      elements: modelElements,
    };
  };

  // Parse RDF CIM file
  const parseRDF = (rdfContent) => {
    try {
      // Parse RDF content into store
      rdflib.parse(rdfContent, store, null, 'application/rdf+xml');

      // Extract CIM objects from the RDF store
      return processRDFData();
    } catch (err) {
      throw new Error(`RDF parsing error: ${err.message}`);
    }
  };

  // Process RDF data into a standardized format
  const processRDFData = () => {
    const modelElements = {};
    const namespace =
      CIMVersions[selectedVersion]?.namespace || 'http://iec.ch/TC57/CIM#';

    // Find all subjects that are CIM objects
    const subjects = store.statementsMatching(null, null, null, null);
    const processedSubjects = new Set();

    subjects.forEach((statement) => {
      const subject = statement.subject;

      // Skip if we've already processed this subject
      if (processedSubjects.has(subject.value)) return;
      processedSubjects.add(subject.value);

      // Get the type of this subject
      const typeStatement = store.any(
        subject,
        rdflib.sym('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        null
      );
      if (!typeStatement) return;

      // Extract the element type
      const fullType = typeStatement.value;
      const elementType = fullType.replace(namespace, '');

      if (!modelElements[elementType]) {
        modelElements[elementType] = [];
      }

      // Get all statements about this subject
      const attributes = {};
      const relationships = {};

      store.statementsMatching(subject, null, null).forEach((stmt) => {
        const predicate = stmt.predicate.value.replace(namespace, '');
        const object = stmt.object;

        // Skip type statements as we've already processed them
        if (predicate === 'type' || predicate === 'rdf:type') return;

        if (object.termType === 'Literal') {
          // This is an attribute
          attributes[predicate] = object.value;
        } else {
          // This is a relationship
          relationships[predicate] = object.value;
        }
      });

      modelElements[elementType].push({
        id: subject.value,
        attributes,
        relationships,
      });
    });

    return {
      version: selectedVersion,
      profile: selectedProfile,
      elements: modelElements,
    };
  };

  // Validate CIM data against schema and profile constraints
  const validateCIM = (data) => {
    const results = {
      valid: true,
      errors: [],
      warnings: [],
    };

    // Check version compatibility
    if (selectedVersion && data.version !== selectedVersion) {
      results.warnings.push(
        `File version (${data.version}) differs from selected version (${selectedVersion})`
      );
    }

    // Check profile compatibility
    if (selectedProfile) {
      const profile = CIMProfiles[selectedProfile];
      if (profile) {
        // Check that all required classes are present
        profile.classes.forEach((requiredClass) => {
          if (
            !data.elements[requiredClass] ||
            data.elements[requiredClass].length === 0
          ) {
            results.errors.push(
              `Required class ${requiredClass} is missing or empty`
            );
            results.valid = false;
          }
        });
      }
    }

    // Add more validation as needed...

    return results;
  };

  // Calculate statistics about the CIM data
  const calculateStats = (data) => {
    let totalElements = 0;
    const elementsByType = {};
    let relationships = 0;

    // Count elements by type
    Object.entries(data.elements).forEach(([type, elements]) => {
      const count = elements.length;
      elementsByType[type] = count;
      totalElements += count;

      // Count relationships
      elements.forEach((element) => {
        relationships += Object.keys(element.relationships || {}).length;
      });
    });

    setStats({
      totalElements,
      elementsByType,
      relationships,
    });
  };

  // Detect CIM version from the data
  const detectCIMVersion = (data) => {
    // Try to extract version information from the XML
    // This is a simplified approach and may need enhancement
    const rdfElement = data.rdf_RDF || data['rdf:RDF'];
    if (rdfElement && rdfElement['@_xmlns:cim']) {
      const namespace = rdfElement['@_xmlns:cim'];

      // Match namespace with known CIM versions
      for (const [version, info] of Object.entries(CIMVersions)) {
        if (info.namespace === namespace) {
          return version;
        }
      }
    }

    return 'Unknown';
  };

  // Generate a unique ID for elements without one
  const generateUniqueId = () => {
    return `_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Extract attributes from XML element
  const extractAttributes = (element) => {
    const attributes = {};

    Object.entries(element).forEach(([key, value]) => {
      // Skip relationship elements and metadata
      if (key.startsWith('@_') && !key.includes('rdf:')) {
        attributes[key.replace('@_', '')] = value;
      } else if (
        !key.startsWith('cim:') &&
        !key.includes('_') &&
        !key.startsWith('@_')
      ) {
        attributes[key] = value;
      }
    });

    return attributes;
  };

  // Extract relationships from XML element
  const extractRelationships = (element) => {
    const relationships = {};

    Object.entries(element).forEach(([key, value]) => {
      if (key.startsWith('cim:') || key.includes('_')) {
        const relationType = key.replace('cim:', '').replace('rdf_', '');

        // Handle both array and single item cases
        const relations = Array.isArray(value) ? value : [value];

        if (!relationships[relationType]) {
          relationships[relationType] = [];
        }

        relations.forEach((relation) => {
          if (relation && relation['@_rdf:resource']) {
            relationships[relationType].push(relation['@_rdf:resource']);
          }
        });
      }
    });

    return relationships;
  };

  // Export CIM data to XML format
  const exportToXML = () => {
    if (!cimData) return null;

    // Implement XML export logic here
    // This would be a complex operation, inverting the parsing process

    alert('Export to XML is not yet implemented');
  };

  // Export CIM data to RDF format
  const exportToRDF = () => {
    if (!cimData) return null;

    // Implement RDF export logic here
    // This would be a complex operation requiring rdflib serialization

    alert('Export to RDF is not yet implemented');
  };

  // UI rendering
  return (
    <div className='cim-data-handler'>
      <div className='upload-section'>
        <h3>CIM Data Import</h3>
        <div className='version-selector'>
          <label htmlFor='cim-version'>CIM Version:</label>
          <select id='cim-version' defaultValue={selectedVersion || 'CIM15v33'}>
            {Object.keys(CIMVersions).map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        </div>
        <div className='profile-selector'>
          <label htmlFor='cim-profile'>CIM Profile:</label>
          <select id='cim-profile' defaultValue={selectedProfile || 'CPSM'}>
            {Object.keys(CIMProfiles).map((profile) => (
              <option key={profile} value={profile}>
                {profile}
              </option>
            ))}
          </select>
        </div>
        <div className='file-upload'>
          <input
            type='file'
            accept='.xml,.rdf'
            onChange={handleFileUpload}
            disabled={loading}
          />
          {loading && <span className='loading-indicator'>Processing...</span>}
        </div>
        {error && <div className='error-message'>{error}</div>}
      </div>

      {validationResults && (
        <div className='validation-results'>
          <h3>Validation Results</h3>
          {validationResults.valid ? (
            <div className='validation-success'>CIM data is valid</div>
          ) : (
            <div className='validation-errors'>
              <h4>Errors:</h4>
              <ul>
                {validationResults.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          {validationResults.warnings.length > 0 && (
            <div className='validation-warnings'>
              <h4>Warnings:</h4>
              <ul>
                {validationResults.warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {cimData && (
        <div className='cim-data-stats'>
          <h3>CIM Data Statistics</h3>
          <div className='stats-grid'>
            <div className='stat'>
              <span className='stat-label'>Total Elements:</span>
              <span className='stat-value'>{stats.totalElements}</span>
            </div>
            <div className='stat'>
              <span className='stat-label'>Relationships:</span>
              <span className='stat-value'>{stats.relationships}</span>
            </div>
            <div className='stat'>
              <span className='stat-label'>CIM Version:</span>
              <span className='stat-value'>{cimData.version}</span>
            </div>
            <div className='stat'>
              <span className='stat-label'>CIM Profile:</span>
              <span className='stat-value'>{cimData.profile || 'N/A'}</span>
            </div>
          </div>

          <h4>Elements by Type</h4>
          <div className='element-type-list'>
            {Object.entries(stats.elementsByType).map(([type, count]) => (
              <div key={type} className='element-type-item'>
                <span className='element-type'>{type}:</span>
                <span className='element-count'>{count}</span>
              </div>
            ))}
          </div>

          <div className='export-options'>
            <button onClick={exportToXML} disabled={!cimData}>
              Export as XML
            </button>
            <button onClick={exportToRDF} disabled={!cimData}>
              Export as RDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CIMDataHandler;

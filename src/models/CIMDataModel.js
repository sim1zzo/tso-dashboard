import * as rdflib from 'rdflib';
import { XMLParser } from 'fast-xml-parser';

class CIMDataModel {
  constructor() {
    this.store = rdflib.graph();
    this.CIM = rdflib.Namespace('http://iec.ch/TC57/CIM#');
    this.RDF = rdflib.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
    this.xmlParser = new XMLParser();
  }



  loadFromRDF(rdfString) {
    rdflib.parse(rdfString, this.store, 'application/rdf+xml');
  }

  exportToXML() {
    // Implementazione dell'esportazione in XML
  }

  exportToRDF() {
    return this.store.serialize('application/rdf+xml');
  }

  getElements(typeString) {
    return this.store.each(null, this.RDF('type'), this.CIM(typeString));
  }
}

export default CIMDataModel;

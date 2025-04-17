import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
// import '../FilterPanel.css';

const FilterContainer = styled.div`
  padding: 5px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: white;
  font-size: 16px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const ElementList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ced4da;
  border-radius: 5px;
`;

const ElementItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #ced4da;
  }
`;

const Button = styled.button`
  padding: 10px 55px;
  margin-top: 15px;
  margin-left: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const categories = {
  All: null,
  Sottostazioni: {
    Nord: [
      'Milano Ovest',
      'Torino Sud',
      'Bologna Ovest',
      'Venezia Fusina',
      'Genova',
      'La Spezia',
      'Padova',
      'Udine Ovest',
      'Rondissone',
      'Piacenza',
      'Parma',
      'Dolo',
      'Colunga',
      'Ravenna',
      'Aosta',
      'Bergamo',
      'Verona',
      'Trento',
      'Ferrara',
    ],
    Centro: [
      'Roma Nord',
      'Firenze Casellina',
      'Villavalle',
      'Perugia',
      'Pescara',
      "L'Aquila",
      'Ancona',
      'Siena',
      'Viterbo',
    ],
    Sud: [
      'Napoli Patria',
      'Bari',
      'Foggia',
      'Rossano',
      'Rizziconi',
      'Campobasso',
      'Avellino',
      'Paestum',
      'Potenza',
      'Lecce',
      'Catanzaro',
      'Salerno',
      'Taranto',
    ],
    Isole: [
      'Palermo Bellolampo',
      'Cagliari Rumianca',
      'Sorgente',
      'Messina',
      'Catania',
      'Siracusa',
      'Trapani',
      'Oristano',
    ],
  },
  'Linee di Trasmissione': {
    '380 kV': [
      'Milano Ovest-Torino Sud',
      'Milano Ovest-Piacenza',
      'Torino Sud-Rondissone',
      'Rondissone-Genova',
      'Genova-La Spezia',
      'La Spezia-Firenze Casellina',
      'Firenze Casellina-Roma Nord',
      'Roma Nord-Napoli Patria',
      'Napoli Patria-Foggia',
      'Foggia-Bari',
      'Bari-Rossano',
      'Rossano-Rizziconi',
      'Rizziconi-Sorgente',
      'Milano Ovest-Venezia Fusina',
      'Venezia Fusina-Padova',
      'Padova-Udine Ovest',
      'Bologna Ovest-Dolo',
      'Bologna Ovest-Colunga',
      'Bologna-Ravenna',
      'Ravenna-Perugia',
      'Perugia-Pescara',
      "Perugia-L'Aquila",
      "L'Aquila-Campobasso",
      'Campobasso-Avellino',
      'Avellino-Paestum',
      'Ravenna-Ancona',
      'Ancona-Foggia',
      'Foggia-Potenza',
      'Potenza-Lecce',
      'Potenza-Catanzaro',
      'Messina-Catania',
      'Catania-Siracusa',
      'Siracusa-Trapani',
      'Trapani-Palermo',
    ],
    '220 kV': [
      'Milano Ovest-Genova',
      'Torino Sud-Genova',
      'Roma Nord-Firenze Casellina',
      'Napoli Patria-Roma Nord',
      'Palermo Bellolampo-Cagliari Rumianca',
      'Rossano-Bari',
      'Sorgente-Rizziconi',
      'Torino-Aosta',
      'Milano-Bergamo',
      'Verona-Trento',
      'Bologna-Ferrara',
      'Firenze-Siena',
      'Roma-Viterbo',
      'Napoli-Salerno',
      'Bari-Taranto',
      'Catania-Messina',
      'Cagliari-Oristano',
    ],
  },
  'Nodi di Interconnessione': {
    Francia: ['Venaus'],
    Svizzera: ['Gorlago', 'Villa di Tirano'],
    Austria: ['Pinciana'],
    Slovenia: ['Redipuglia'],
  },
  'Centrali Elettriche': {
    Termoelettrica: [
      'Civitavecchia',
      'Montalto di Castro',
      'Brindisi Sud',
      'La Spezia',
    ],
    Idroelettrica: ['Entracque', 'Presenzano'],
    Geotermica: ['Larderello'],
    Eolica: ['Troia'],
    Solare: ['Montalto di Castro'],
  },
};

const FilterPanel = ({
  onFilterChange,
  onElementSelect,
  onResetMap,
  selectedCategory,
  selectedSubCategory,
  networkModel,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredElements, setFilteredElements] = useState([]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      const allElements = Object.entries(categories)
        .filter(([key]) => key !== 'All')
        .flatMap(([_, category]) => Object.values(category).flat())
        .filter((element) =>
          element.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setFilteredElements(allElements);
    } else if (selectedCategory === 'Linee di Trasmissione') {
      if (selectedSubCategory) {
        const voltage = parseInt(selectedSubCategory);
        const filteredLines = networkModel.lines.filter(
          (line) =>
            line.voltage === voltage &&
            line.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredElements(filteredLines.map((line) => line.name));
      } else {
        // Se non è selezionata una sottocategoria, mostra tutte le linee
        const allLines = networkModel.lines.filter((line) =>
          line.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredElements(allLines.map((line) => line.name));
      }
    } else if (selectedCategory && selectedSubCategory) {
      const categoryData = categories[selectedCategory];
      if (categoryData && categoryData[selectedSubCategory]) {
        setFilteredElements(
          categoryData[selectedSubCategory].filter((element) =>
            element.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      } else {
        setFilteredElements([]);
      }
    } else {
      setFilteredElements([]);
    }
  }, [selectedCategory, selectedSubCategory, searchTerm, networkModel]);

  const handleCategoryChange = useCallback(
    (e) => {
      const newCategory = e.target.value;
      if (newCategory === 'All') {
        onFilterChange({
          category: 'All',
          subCategory: '',
          elements: [],
        });
      } else {
        onFilterChange({
          category: newCategory,
          subCategory: '',
          elements: [],
        });
      }
    },
    [onFilterChange]
  );

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    onFilterChange({
      category: 'All',
      subCategory: '',
      elements: [],
    });
    onResetMap();
  }, [onFilterChange, onResetMap]);

  const handleSubCategoryChange = useCallback(
    (e) => {
      onFilterChange({
        category: selectedCategory,
        subCategory: e.target.value,
        elements: [],
      });
    },
    [onFilterChange, selectedCategory]
  );


  const handleElementClick = (elementName) => {
    let elementType, coordinates;
  
    if (selectedCategory === 'Sottostazioni') {
      elementType = 'substation';
      const substation = networkModel.substations.find(s => s.name === elementName);
      coordinates = substation ? substation.coordinates : null;
    } else if (selectedCategory === 'Linee di Trasmissione') {
      elementType = 'line';
      const line = networkModel.lines.find(l => l.name === elementName);
      coordinates = line ? line.coordinates : null;
    } else if (selectedCategory === 'Nodi di Interconnessione') {
      elementType = 'interconnection';
      const node = networkModel.interconnectionNodes.find(n => n.name === elementName);
      coordinates = node ? node.coordinates : null;
    } else if (selectedCategory === 'Centrali Elettriche') {
      elementType = 'powerPlant';
      const plant = networkModel.generatingUnits.find(p => p.name === elementName);
      coordinates = plant ? plant.coordinates : null;
    }
  
    if (coordinates) {
      if (elementType === 'line' && Array.isArray(coordinates) && coordinates.length >= 2) {
        onElementSelect({
          name: elementName,
          type: elementType,
          coordinates: coordinates,
          category: selectedCategory,
          subCategory: selectedSubCategory,
        });
      } else if (Array.isArray(coordinates) && coordinates.length === 2 &&
                 typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
        onElementSelect({
          name: elementName,
          type: elementType,
          coordinates: coordinates,
          category: selectedCategory,
          subCategory: selectedSubCategory,
        });
      } else {
        console.error('Formato coordinate non valido per l\'elemento:', elementName, coordinates);
      }
    } else {
      console.error('Coordinate mancanti per l\'elemento:', elementName);
    }
  };

  // const handleElementClick = (elementName) => {
  //   let elementType, coordinates;

  //   if (selectedCategory === 'Sottostazioni') {
  //     elementType = 'substation';
  //     const substation = networkModel.substations.find(
  //       (s) => s.name === elementName
  //     );
  //     coordinates = substation ? substation.coordinates : null;
  //   } else if (selectedCategory === 'Linee di Trasmissione') {
  //     elementType = 'line';
  //     const line = networkModel.lines.find((l) => l.name === elementName);
  //     coordinates = line ? line.coordinates : null;
  //   } else if (selectedCategory === 'Nodi di Interconnessione') {
  //     elementType = 'interconnection';
  //     const node = networkModel.interconnectionNodes.find(
  //       (n) => n.name === elementName
  //     );
  //     coordinates = node ? node.coordinates : null;
  //   } else if (selectedCategory === 'Centrali Elettriche') {
  //     elementType = 'powerPlant';
  //     const plant = networkModel.generatingUnits.find(
  //       (p) => p.name === elementName
  //     );
  //     coordinates = plant ? plant.coordinates : null;
  //   }

  //   if (coordinates) {
  //     onElementSelect({
  //       name: elementName,
  //       type: elementType,
  //       coordinates: coordinates,
  //       category: selectedCategory,
  //       subCategory: selectedSubCategory,
  //     });
  //   }
  // };

  return (
    <FilterContainer>
      <Select value={selectedCategory} onChange={handleCategoryChange}>
        {Object.keys(categories)
          .filter((category) => category !== 'Tutte')
          .map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
      </Select>
  
      {selectedCategory !== 'Tutte' && (
        <>
          {categories[selectedCategory] && (
            <Select
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
            >
              <option value="">Seleziona sottocategoria</option>
              {Object.keys(categories[selectedCategory]).map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </Select>
          )}
  
          {selectedSubCategory && (
            <>
              <SearchInput
                type='text'
                placeholder='Cerca elementi...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ElementList>
                {filteredElements.map((element) => (
                  <ElementItem
                    key={element}
                    onClick={() => handleElementClick(element)}
                  >
                    {element}
                  </ElementItem>
                ))}
              </ElementList>
            </>
          )}
        </>
      )}
  
      <Button onClick={resetFilters}>Reset Filtri</Button>
    </FilterContainer>
  );
};

export default FilterPanel;

import { v4 as uuidv4 } from 'uuid';

class IdentifiedObject {
  constructor(name) {
    this.mRID = uuidv4();
    this.name = name;
  }
}

class EquipmentContainer extends IdentifiedObject {
  constructor(name) {
    super(name);
    this.equipments = [];
  }

  addEquipment(equipment) {
    this.equipments.push(equipment);
  }
}

class Equipment extends IdentifiedObject {
  constructor(name) {
    super(name);
    this.operationalStatus = Math.random() > 0.9 ? 'Manutenzione' : 'Operativo';
    this.lastMaintenanceDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    this.assetHealthIndex = Math.floor(80 + Math.random() * 20);
  }
}

class Substation extends EquipmentContainer {
  constructor(name, location, voltageLevel) {
    super(name);
    if (!location || !location.lat || !location.lng) {
      throw new Error(`Invalid location for substation ${name}`);
    }
    this.location = location;
    this.voltageLevel = voltageLevel;
    this.loadFactor = Math.floor(Math.random() * 100);
    this.busVoltage = parseFloat((voltageLevel.split('/')[0] * (0.95 + Math.random() * 0.1)).toFixed(2));
    this.frequency = parseFloat((50 + (Math.random() - 0.5) * 0.1).toFixed(3));
    this.temperatureAmbient = parseFloat((20 + (Math.random() - 0.5) * 20).toFixed(1));
    this.reliabilityIndex = parseFloat((95 + Math.random() * 5).toFixed(2));
  }
}

class Line extends IdentifiedObject {
  constructor(name, from, to, voltage) {
    super(name);
    this.from = from;
    this.to = to;
    this.voltage = voltage;
    this.currentLoad = parseFloat((Math.random() * 1000).toFixed(2));
    this.activePower = parseFloat((Math.random() * 500).toFixed(2));
    this.reactivePower = parseFloat((Math.random() * 100).toFixed(2));
    this.conductorTemperature = parseFloat((30 + Math.random() * 30).toFixed(1));
    this.congestionLevel = parseFloat((Math.random() * 100).toFixed(2));
    this.length = parseFloat((50 + Math.random() * 150).toFixed(1));
    this.lossRate = parseFloat((1 + Math.random() * 4).toFixed(2));
    this.availableCapacity = parseFloat((this.voltage * 1.5 - this.currentLoad).toFixed(2));
  }
}

class PowerTransformer extends Equipment {
  constructor(name, location) {
    super(name);
    this.location = location;
    this.loadFactor = Math.floor(Math.random() * 100);
    this.oilTemperature = parseFloat((40 + Math.random() * 30).toFixed(1));
    this.windingTemperature = parseFloat((50 + Math.random() * 40).toFixed(1));
    this.efficiency = parseFloat((95 + Math.random() * 4).toFixed(2));
  }
}

class GeneratingUnit extends IdentifiedObject {
  constructor(name, type, capacity) {
    super(name);
    this.type = type;
    this.capacity = capacity;
    this.outputPower = parseFloat((Math.random() * capacity).toFixed(2));
    this.efficiency = parseFloat((80 + Math.random() * 15).toFixed(2));
    this.fuelLevel = type === 'Termoelettrica' ? Math.floor(Math.random() * 100) : null;
    this.emissionRate = type === 'Termoelettrica' ? parseFloat((Math.random() * 500).toFixed(2)) : 0;
    this.availabilityFactor = parseFloat((85 + Math.random() * 10).toFixed(2));
  }
}

class NetworkModel {
  constructor() {
    this.substations = [];
    this.lines = [];
    this.generatingUnits = [];
    this.interconnectionNodes = [];
  }

  addSubstation(substation) {
    this.substations.push(substation);
  }

  addLine(line) {
    this.lines.push(line);
  }

  addGeneratingUnit(generatingUnit) {
    this.generatingUnits.push(generatingUnit);
  }

  addInterconnectionNode(node) {
    this.interconnectionNodes.push(node);
  }
}

const createNetworkModel = () => {
  const model = new NetworkModel();

  // Sottostazioni principali
  const sottostazioni = {
    romaNord: new Substation(
      'Roma Nord',
      { lat: 41.9028, lng: 12.4964 },
      '380/220 kV'
    ),
    milanoOvest: new Substation(
      'Milano Ovest',
      { lat: 45.4642, lng: 9.19 },
      '380/220 kV'
    ),
    torinoSud: new Substation(
      'Torino Sud',
      { lat: 45.0703, lng: 7.6869 },
      '380/220 kV'
    ),
    firenzeCasellina: new Substation(
      'Firenze Casellina',
      { lat: 43.7696, lng: 11.2558 },
      '380/220 kV'
    ),
    bolognaOvest: new Substation(
      'Bologna Ovest',
      { lat: 44.4949, lng: 11.3426 },
      '380/220 kV'
    ),
    veneziaFusina: new Substation(
      'Venezia Fusina',
      { lat: 45.4064, lng: 12.3083 },
      '380/220 kV'
    ),
    napoliPatria: new Substation(
      'Napoli Patria',
      { lat: 40.8518, lng: 14.2681 },
      '380/220 kV'
    ),
    bari: new Substation('Bari', { lat: 41.1171, lng: 16.8719 }, '380/220 kV'),
    palermoBellolampo: new Substation(
      'Palermo Bellolampo',
      { lat: 38.1157, lng: 13.3615 },
      '220 kV'
    ),
    cagliariRumianca: new Substation(
      'Cagliari Rumianca',
      { lat: 39.2238, lng: 9.1217 },
      '380/220 kV'
    ),
    genova: new Substation(
      'Genova',
      { lat: 44.4056, lng: 8.9463 },
      '380/220 kV'
    ),
    laSpezia: new Substation(
      'La Spezia',
      { lat: 44.1024, lng: 9.824 },
      '380/220 kV'
    ),
    padova: new Substation(
      'Padova',
      { lat: 45.4064, lng: 11.8768 },
      '380/220 kV'
    ),
    udine: new Substation(
      'Udine Ovest',
      { lat: 46.064, lng: 13.2306 },
      '380/220 kV'
    ),
    foggia: new Substation(
      'Foggia',
      { lat: 41.4621, lng: 15.5444 },
      '380/220 kV'
    ),
    rondissone: new Substation(
      'Rondissone',
      { lat: 45.2328, lng: 7.8581 },
      '380/220 kV'
    ),
    piacenza: new Substation(
      'Piacenza',
      { lat: 45.0526, lng: 9.693 },
      '380/220 kV'
    ),
    olbia: new Substation(
      'Olbia',
      { lat: 40.9231, lng: 9.4889 },
      '380/220 kV'
    ),
    parma: new Substation(
      'Parma',
      { lat: 44.8015, lng: 10.3279 },
      '380/220 kV'
    ),
    dolo: new Substation('Dolo', { lat: 45.4279, lng: 12.0823 }, '380/220 kV'),
    colunga: new Substation(
      'Colunga',
      { lat: 44.54, lng: 11.4048 },
      '380/220 kV'
    ),
    villavalle: new Substation(
      'Villavalle',
      { lat: 42.5614, lng: 12.7351 },
      '380/220 kV'
    ),
    rossano: new Substation(
      'Rossano',
      { lat: 39.5748, lng: 16.6337 },
      '380/220 kV'
    ),
    sorgente: new Substation(
      'Sorgente',
      { lat: 38.1938, lng: 15.5453 },
      '380/220 kV'
    ),
    rizziconi: new Substation(
      'Rizziconi',
      { lat: 38.4115, lng: 15.9637 },
      '380/220 kV'
    ),
  };

  // Aggiungi tutte le sottostazioni al modello
  Object.values(sottostazioni).forEach((substation) =>
    model.addSubstation(substation)
  );

  // Linee di trasmissione 380 kV
  const linee380kV = [
    ['Milano Ovest', 'Torino Sud'],
    ['Milano Ovest', 'Piacenza'],
    ['Torino Sud', 'Rondissone'],
    ['Rondissone', 'Genova'],
    ['Genova', 'La Spezia'],
    ['La Spezia', 'Firenze Casellina'],
    ['Firenze Casellina', 'Roma Nord'],
    ['Roma Nord', 'Napoli Patria'],
    ['Napoli Patria', 'Foggia'],
    ['Foggia', 'Bari'],
    ['Bari', 'Rossano'],
    ['Rossano', 'Rizziconi'],
    ['Rizziconi', 'Sorgente'],
    ['Milano Ovest', 'Venezia Fusina'],
    ['Venezia Fusina', 'Padova'],
    ['Padova', 'Udine Ovest'],
    ['Bologna Ovest', 'Firenze Casellina'],
    ['Bologna Ovest', 'Parma'],
    ['Parma', 'Piacenza'],
    ['Bologna Ovest', 'Colunga'],
    ['Colunga', 'Villavalle'],
    ['Villavalle', 'Roma Nord'],
    ['Roma Nord', 'Olbia'],
  ];

  linee380kV.forEach(([da, a]) => {
    model.addLine(
      new Line(
        `${da}-${a} 380kV`,
        sottostazioni[da.toLowerCase().replace(/\s+/g, '')],
        sottostazioni[a.toLowerCase().replace(/\s+/g, '')],
        380
      )
    );
  });

  // Linee di trasmissione 220 kV (aggiungiamo alcune linee principali)
  const linee220kV = [
    ['Milano Ovest', 'Genova'],
    ['Torino Sud', 'Genova'],
    ['Firenze Casellina', 'Bologna Ovest'],
    ['Roma Nord', 'Napoli Patria'],
    ['Napoli Patria', 'Foggia'],
    ['Foggia', 'Bari'],
    ['Palermo Bellolampo', 'Sorgente'],
    ['Cagliari Rumianca', 'Sorgente'],
    ['Venezia Fusina', 'Padova'],
    ['Padova', 'Udine Ovest'],
    ['Dolo', 'Venezia Fusina'],
    ['Colunga', 'Bologna Ovest'],
  ];

  linee220kV.forEach(([da, a]) => {
    model.addLine(
      new Line(
        `${da}-${a} 220kV`,
        sottostazioni[da.toLowerCase().replace(/\s+/g, '')],
        sottostazioni[a.toLowerCase().replace(/\s+/g, '')],
        220
      )
    );
  });

  // Generating Units (mantenute come nell'esempio originale)
  model.addGeneratingUnit(
    new GeneratingUnit('Civitavecchia', 'Termoelettrica', 1980)
  );
  model.addGeneratingUnit(
    new GeneratingUnit('Entracque', 'Idroelettrica', 1065)
  );
  model.addGeneratingUnit(new GeneratingUnit('Larderello', 'Geotermica', 769));
  model.addGeneratingUnit(new GeneratingUnit('Troia', 'Eolica', 30));
  model.addGeneratingUnit(
    new GeneratingUnit('Montalto di Castro', 'Solare', 45)
  );
  model.addGeneratingUnit(
    new GeneratingUnit('Brindisi Sud', 'Termoelettrica', 2640)
  );
  model.addGeneratingUnit(
    new GeneratingUnit('La Spezia', 'Termoelettrica', 1280)
  );
  model.addGeneratingUnit(
    new GeneratingUnit('Presenzano', 'Idroelettrica', 1000)
  );

  // Interconnection Nodes (mantenuti come nell'esempio originale)
  model.addInterconnectionNode(
    new PowerTransformer('Venaus', { lat: 45.1839, lng: 6.9556 })
  );
  model.addInterconnectionNode(
    new PowerTransformer('Gorlago', { lat: 45.6839, lng: 9.7653 })
  );
  model.addInterconnectionNode(
    new PowerTransformer('Redipuglia', { lat: 45.8433, lng: 13.4833 })
  );
  model.addInterconnectionNode(
    new PowerTransformer('Villa di Tirano', { lat: 46.2, lng: 10.1667 })
  );
  model.addInterconnectionNode(
    new PowerTransformer('Pinciana', { lat: 47.33, lng: 13.33 })
  );

  return model;
};

export {
  createNetworkModel,
  NetworkModel,
  Substation,
  Line,
  PowerTransformer,
  GeneratingUnit,
  EquipmentContainer,
  IdentifiedObject,
  Equipment,
};
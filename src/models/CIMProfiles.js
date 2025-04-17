// CIMProfiles.js
import { CIMVersions } from './CIMVersions';

export const CIMProfiles = {
  CPSM: {
    version: CIMVersions.CIM15v33,
    classes: [
      'Substation',
      'VoltageLevel',
      'PowerTransformer',
      'ACLineSegment',
    ],
  },
  'ENTSO-E': {
    version: CIMVersions.CIM15v33,
    classes: [
      'Substation',
      'VoltageLevel',
      'PowerTransformer',
      'ACLineSegment',
      'EquivalentInjection',
    ],
  },
};

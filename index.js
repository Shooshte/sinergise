const mockGeometryObjects = require('./mockGeometryObject');
const mockGeometryStrings = require('./mockGeometryStrings');

class WKTWriter {

  // Coords methods
  makeCoordPair(x , y) {
    return x + ' ' + y;
  };
  makeCoordPairsList(geometryObject) {
    return geometryObject.x.map((xCoord, index) => {
      return index === 0 ? this.makeCoordPair(xCoord, geometryObject.y[index]) : ' ' + this.makeCoordPair(xCoord, geometryObject.y[index]);
    });
  }
  makeOuterString(type, coords) {
    return type.toUpperCase() + ' (' + coords + ')';
  }

  // Write method
  write(geometryObject) {

    // Check if empty shape
    if(geometryObject.isEmpty === true) {
      return geometryObject.type.toUpperCase() + ' EMPTY';
    }

    // POINT
    else if(geometryObject.type === 'Point') {
      const coords = this.makeCoordPair(geometryObject.x, geometryObject.y);
      return this.makeOuterString(geometryObject.type, coords);
    }

    // MULTIPOINT
    else if(geometryObject.type === 'MultiPoint') {
      const coords = this.makeCoordPairsList(geometryObject);
      return this.makeOuterString(geometryObject.type, coords);
    }

    // LINESTRING
    else if(geometryObject.type === 'LineString') {
      const coords = this.makeCoordPairsList(geometryObject);
      return this.makeOuterString(geometryObject.type, coords);
    }

    // MULTILINESTRING
    else if(geometryObject.type === 'MultiLineString') {
      const coords = geometryObject.collection.map((LineString, index) => {
        return index === 0 ? '(' + this.makeCoordPairsList(LineString) + ')' : ' (' + this.makeCoordPairsList(LineString) + ')';
      });
      return this.makeOuterString(geometryObject.type, coords);
    }

    // POLYGON
    else if(geometryObject.type === 'Polygon') {
      let coords = '(' + this.makeCoordPairsList(geometryObject.outer) + ')';
      if(geometryObject.holes) {
        coords = coords + ', (' + this.makeCoordPairsList(geometryObject.holes) + ')';
      }
      return this.makeOuterString(geometryObject.type, coords);
    }

    // MULTIPOLYGON
    else if(geometryObject.type === 'MultiPolygon') {
      let polygonCoords = geometryObject.collection.map((polygon, index) => {
        let coords = '(' + this.makeCoordPairsList(polygon.outer) + ')';
        if(polygon.holes) {
          coords = coords + ', (' + this.makeCoordPairsList(polygon.outer) + ')';
        }
        return index === 0 ? '(' + coords + ')' : ' (' + coords + ')';
      });
      return this.makeOuterString(geometryObject.type, polygonCoords);
    }

    // GEOMETRY COLLECTION
    else if(geometryObject.type === 'GeometryCollection') {
      const objectStrings = geometryObject.collection.map((object) => {
        return this.write(object)
      });
      return this.makeOuterString(geometryObject.type, objectStrings);
    }
  }

}

class WKTReader {
  defineObjectType(string) {
    const objectTypes = [
      'POINT',
      'LINESTRING',
      'POLYGON',
      'MULTIPOINT',
      'MULTILINESTRING',
      'MULTIPOLYGON',
      'GEOMETRYCOLLECTION'
    ];
    let objectType = ''
    objectTypes.map((type) => {
      if(string.indexOf(type) === 0) {
        objectType = type.charAt(0) + type.slice(1).toLowerCase();
      }
    });
    if(objectType.indexOf('Multi') === 0) {
      objectType = objectType.slice(0, 5) + objectType.charAt(5).toUpperCase() + objectType.slice(6);
    }
    if(objectType.indexOf('Geometry') === 0) {
      objectType = objectType.slice(0, 8) + objectType.charAt(8).toUpperCase() + objectType.slice(9);
    }
    return objectType;
  }

  checkForEmpty(string) {
    const empty = 'EMPTY';
    let regex = new RegExp(empty);
    return regex.test(string);
  }

  getOuterParenthesis(string) {
    const start = string.indexOf('(');
    const end = string.lastIndexOf(')');
    return string.slice(start + 1, end);
  }

  removeParenthesis(string) {
    string = string.replace(/\(/g, '');
    string = string.replace(/\)/g, '');
    return string;
  }

  read(geometryString) {
    // Get object type
    const objectType = this.defineObjectType(geometryString);

    // Check if object is empty
    if(objectType !== 'GeometryCollection') {
      if (this.checkForEmpty(geometryString) === true) {
        return {
          isEmpty: true,
          type: objectType
        }
      }
    }

    // POINT
    if(objectType === 'Point') {
      const coordString = this.getOuterParenthesis(geometryString);
      const coordsArray = coordString.split(' ');
      return {
        isEmpty: false,
        type: objectType,
        x: parseInt(coordsArray[0]),
        y: parseInt(coordsArray[1])
      }
    }

    // MULTIPOINT
    if(objectType === 'MultiPoint') {
      const coordString = this.getOuterParenthesis(geometryString);
      const coordsArray = coordString.split(', ');
      const x = [];
      const y = [];
      coordsArray.map((coordPair) => {
        coordPair = coordPair.split(' ');
        x.push(parseInt(coordPair[0]));
        y.push(parseInt(coordPair[1]));
      });
      return {
        isEmpty: false,
        type: objectType,
        x: x,
        y: y
      }
    }

    // LINESTRING
    if(objectType === 'Linestring') {
      const coordString = this.getOuterParenthesis(geometryString);
      const coordsArray = coordString.split(', ');
      const x = [];
      const y = [];
      coordsArray.map((coordPair) => {
        coordPair = coordPair.split(' ');
        x.push(parseInt(coordPair[0]));
        y.push(parseInt(coordPair[1]));
      });
      return {
        isEmpty: false,
        type: objectType,
        x: x,
        y: y
      }
    }

    // MULTILINESTRING
    if(objectType === 'MultiLinestring') {
      let outerParenthesis = this.getOuterParenthesis(geometryString);
      outerParenthesis = outerParenthesis.split('), ');
      let lineStrings = outerParenthesis.map((linestring) => {
        return this.removeParenthesis(linestring);
      });
      let lineStringObjects = lineStrings.map((lineString) => {
        const coordsArray = lineString.split(', ');
        const x = [];
        const y = [];
        coordsArray.map((coordPair) => {
          coordPair = coordPair.split(' ');
          x.push(parseInt(coordPair[0]));
          y.push(parseInt(coordPair[1]));
        });
        return {
          isEmpty: false,
          type: 'LineString',
          x: x,
          y: y
        }
      });
      return {
        isEmpty: false,
        type: objectType,
        collection: lineStringObjects
      };
    }

    // POLYGON
    if(objectType === 'Polygon') {
      let outerParenthesis = this.getOuterParenthesis(geometryString);
      // If the polygon has a hole
      if(outerParenthesis.indexOf('), ') > 0) {
        let objectArray = outerParenthesis.split('), ');
        objectArray = objectArray.map((object) => {
          return this.removeParenthesis(object);
        });

        let outer = {
          x: [],
          y: []
        };
        let inner = {
          x: [],
          y: []
        };

        let outerPoints = objectArray[0].split(', ');
        outerPoints.map((pointPair) => {
          let pointPairArray = pointPair.split(' ');
          outer.x.push(parseInt(pointPairArray[0]));
          outer.y.push(parseInt(pointPairArray[1]));
        });

        let innerPoints = objectArray[1].split(', ');
        innerPoints.map((pointPair) => {
          let pointPairArray = pointPair.split(' ');
          inner.x.push(parseInt(pointPairArray[0]));
          inner.y.push(parseInt(pointPairArray[1]));
        });

        return {
          isEmpty: false,
          type: 'Polygon',
          outer: outer,
          holes: inner
        }
      }
      else {
        let outer = {
          x: [],
          y: []
        };
        let pointsArray = this.removeParenthesis(outerParenthesis);
        let outerPoints = pointsArray.split(', ');
        outerPoints.map((pointPair) => {
          let pointPairArray = pointPair.split(' ');
          outer.x.push(parseInt(pointPairArray[0]));
          outer.y.push(parseInt(pointPairArray[1]));
        });

        return {
          isEmpty: false,
          type: 'Polygon',
          outer: outer
        }

      }
    }

    // MULTIPOLYGON
    if(objectType === 'MultiPolygon') {
      let multiPoligons = this.getOuterParenthesis(geometryString);

      let polygonsArray = multiPoligons.split(')), ');

      let polygonCollection = polygonsArray.map((polygonString) => {
        // If it has a hole
        if(polygonString.indexOf('), ') > 0) {
          let objectArray = polygonString.split('), ');
          objectArray = objectArray.map((object) => {
            return this.removeParenthesis(object);
          });

          let outer = {
            x: [],
            y: []
          };
          let inner = {
            x: [],
            y: []
          };

          let outerPoints = objectArray[0].split(', ');
          outerPoints.map((pointPair) => {
            let pointPairArray = pointPair.split(' ');
            outer.x.push(parseInt(pointPairArray[0]));
            outer.y.push(parseInt(pointPairArray[1]));
          });

          let innerPoints = objectArray[1].split(', ');
          innerPoints.map((pointPair) => {
            let pointPairArray = pointPair.split(' ');
            inner.x.push(parseInt(pointPairArray[0]));
            inner.y.push(parseInt(pointPairArray[1]));
          });

          return {
            isEmpty: false,
            type: 'Polygon',
            outer: outer,
            holes: inner
          }
        }
        else {
          let outer = {
            x: [],
            y: []
          };
          let pointsArray = this.removeParenthesis(polygonString);
          let outerPoints = pointsArray.split(', ');
          outerPoints.map((pointPair) => {
            let pointPairArray = pointPair.split(' ');
            outer.x.push(parseInt(pointPairArray[0]));
            outer.y.push(parseInt(pointPairArray[1]));
          });

          return {
            isEmpty: false,
            type: 'Polygon',
            outer: outer
          }
        }
      });

      return {
        isEmpty: false,
        type: 'MultiPolygon',
        collection: polygonCollection
      };
    }

    // GEOMTRYCOLLECTION
    if(objectType === 'GeometryCollection') {
      let collectionStrings = this.getOuterParenthesis(geometryString);
      let collectionStringsArray = collectionStrings.split(/(?:\,)(?=[A-Z])/);

      let collectionObject = collectionStringsArray.map((objectString) => {
        return this.read(objectString);
      });

      return {
        isEmpty: false,
        type: 'GeometryCollection',
        collection: collectionObject
      }
    }

  }
}

const x = new WKTWriter();
let stringOutput = mockGeometryObjects.map((object) => {
  return x.write(object);
});

const y = new WKTReader();
let objectOutput = mockGeometryStrings.map((string) => {
  return y.read(string);
});

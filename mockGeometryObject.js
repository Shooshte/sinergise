const mockGeometryObjects =
  [{
    isEmpty: false,
    type: 'Point',
    x: 10,
    y: 5
  },
  {
    isEmpty: true,
    type: 'Point',
    x: 57
  },
  {
    isEmpty: false,
    type: 'LineString',
    x: [5, 15, 8],
    y: [6, 17, 9]
  },
  {
    isEmpty: true,
    type: 'LineString',
    x: [5, 15, 8],
    y: [6, 17, 9]
  },
  {
    isEmpty: false,
    type: 'Polygon',
    outer: {
      x: [55, 7, 90, 33, 55],
      y: [1, 6, 99, 5, 1]
    },
    holes: {
      x: [45, -3, 80, 45],
      y: [-9, -4, 89, -9]
    }
  },
  {
    isEmpty: false,
    type: 'Polygon',
    outer: {
      x: [55, 7, 90, 33, 55],
      y: [1, 6, 99, 5, 1]
    }
  },
  {
    isEmpty: true,
    type: 'Polygon'
  },
  {
    isEmpty: false,
    type: 'MultiPoint',
    x: [55, 7, 90, 33, 55],
    y: [1, 6, 99, 5, 1]
  },
  {
    isEmpty: true,
    type: 'MultiPoint'
  },
  {
    isEmpty: false,
    type: 'MultiLineString',
    collection: [
      {
        isEmpty: false,
        type: 'LineString',
        x: [5, 15, 8],
        y: [6, 17, 9]
      },
      {
        isEmpty: false,
        type: 'LineString',
        x: [5, 15, 8],
        y: [6, 17, 9]
      },
      {
        isEmpty: false,
        type: 'LineString',
        x: [5, 15, 8],
        y: [6, 17, 9]
      }
    ]
  },
  {
    isEmpty: true,
    type: 'MultiLineString',
  },
  {
    isEmpty: false,
    type: 'MultiPolygon',
    collection: [
      {
        isEmpty: false,
        type: 'Polygon',
        outer: {
          x: [55, 7, 90, 33, 55],
          y: [1, 6, 99, 5, 1]
        }
      },
      {
        isEmpty: false,
        type: 'Polygon',
        outer: {
          x: [55, 7, 90, 33, 55],
          y: [1, 6, 99, 5, 1]
        },
        holes: {
          x: [45, -3, 80, 45],
          y: [-9, -4, 89, -9]
        }
      }
    ]
  },
  {
    isEmpty: true,
    type: 'MultiPolygon',
  },
  {
    isEmpty: false,
    type: 'GeometryCollection',
    collection: [
      {
        isEmpty: false,
        type: 'Point',
        x: 10,
        y: 5
      },
      {
        isEmpty: true,
        type: 'Point',
        x: 57
      },
      {
        isEmpty: false,
        type: 'LineString',
        x: [5, 15, 8],
        y: [6, 17, 9]
      },
      {
        isEmpty: true,
        type: 'LineString',
        x: [5, 15, 8],
        y: [6, 17, 9]
      },
      {
        isEmpty: false,
        type: 'Polygon',
        outer: {
          x: [55, 7, 90, 33, 55],
          y: [1, 6, 99, 5, 1]
        },
        holes: {
          x: [45, -3, 80, 45],
          y: [-9, -4, 89, -9]
        }
      },
      {
        isEmpty: false,
        type: 'Polygon',
        outer: {
          x: [55, 7, 90, 33, 55],
          y: [1, 6, 99, 5, 1]
        }
      },
      {
        isEmpty: true,
        type: 'Polygon'
      },
      {
        isEmpty: false,
        type: 'MultiPoint',
        x: [55, 7, 90, 33, 55],
        y: [1, 6, 99, 5, 1]
      },
      {
        isEmpty: true,
        type: 'MultiPoint'
      },
      {
        isEmpty: false,
        type: 'MultiLineString',
        collection: [
          {
            isEmpty: false,
            type: 'LineString',
            x: [5, 15, 8],
            y: [6, 17, 9]
          },
          {
            isEmpty: false,
            type: 'LineString',
            x: [5, 15, 8],
            y: [6, 17, 9]
          },
          {
            isEmpty: false,
            type: 'LineString',
            x: [5, 15, 8],
            y: [6, 17, 9]
          }
        ]
      },
      {
        isEmpty: true,
        type: 'MultiLineString',
      },
      {
        isEmpty: false,
        type: 'MultiPolygon',
        collection: [
          {
            isEmpty: false,
            type: 'Polygon',
            outer: {
              x: [55, 7, 90, 33, 55],
              y: [1, 6, 99, 5, 1]
            }
          },
          {
            isEmpty: false,
            type: 'Polygon',
            outer: {
              x: [55, 7, 90, 33, 55],
              y: [1, 6, 99, 5, 1]
            },
            holes: {
              x: [45, -3, 80, 45],
              y: [-9, -4, 89, -9]
            }
          }
        ]
      },
      {
        isEmpty: true,
        type: 'MultiPolygon',
      }
    ]
  },
  {
    isEmpty: true,
    type: 'GeometryCollection'
  }];

module.exports = mockGeometryObjects;
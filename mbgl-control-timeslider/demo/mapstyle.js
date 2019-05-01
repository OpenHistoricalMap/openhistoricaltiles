/*
 * A MB Style object, used as-is by the Mapbox GL map define layers, styles, basemap options, etc
 * Broken into a separate file for more modular version control, so design folks can mess with it with fewer merge conflicts
 * This file being a JSON-like structure, but not a JSON document, we have certain liberties such as commenting and variable interpolation.
 *
 * While this structure can be READ at startup to create UI etc,
 * the official source of truth once the map is running would be MAP.getStyle().layers
 * which would reflect the actual state of the layers at that time: changed visibility, style & filters, ...
 * and it's the LayerPickerControl which will change the visibility of these layers (that's why they're all "none" right now)
 */

var OHM_BASE_URL = "https://vtiles.openhistoricalmap.org/";
var OHM_TILEJSON = `${OHM_BASE_URL}/index.json`;
var OHM_URL      = `${OHM_BASE_URL}/{z}/{x}/{y}.pbf`;

var THIS_URL = window.location.href.split('#')[0];
var SPRITE_URL_ROOT = THIS_URL + "styles/osm-bright-gl-style/sprite";
var FONT_URL_STRING = THIS_URL + "fonts/{fontstack}/{range}.pbf";


/*
 * This style is a direct lift of openmaptiles/osm-bright-gl-style    https://github.com/openmaptiles/osm-bright-gl-style    - GA 2018 July
 */
var GLMAP_STYLE = {
  "version": 8,
  "name": "ohmbasemap",
  "sources": {
    "ohm-data": {
      "type": "vector",
      "tiles": [
        OHM_URL
      ]
    },
  },
  "sprite": SPRITE_URL_ROOT,
  "glyphs": FONT_URL_STRING,
  "layers": [
    /*
     * THE OHM LAYER, the real meat of the matter
     * Layer list of of July 12 2018:
     * water
     * waterway
     * landcover
     * landuse
     * mountain_peak
     * park
     * boundary
     * aeroway
     * transportation
     * building
     * water_name
     * transportation_name
     * place
     * housenumber
     * poi
     * aerodrome_label
     */

    {
      "id": "landcover-glacier",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "landcover",
      "filter": [
        "==",
        "subclass",
        "glacier"
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#fff",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              0,
              0.9
            ],
            [
              10,
              0.3
            ]
          ]
        }
      }
    },
    {
      "id": "landuse-residential",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "residential"
      ],
      "paint": {
        "fill-color": {
          "base": 1,
          "stops": [
            [
              12,
              "hsla(30, 19%, 90%, 0.4)"
            ],
            [
              16,
              "hsla(30, 19%, 90%, 0.2)"
            ]
          ]
        }
      }
    },
    {
      "id": "landuse-commercial",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "landuse",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "class",
          "commercial"
        ]
      ],
      "paint": {
        "fill-color": "hsla(0, 60%, 87%, 0.23)"
      }
    },
    {
      "id": "landuse-industrial",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "landuse",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "class",
          "industrial"
        ]
      ],
      "paint": {
        "fill-color": "hsla(49, 100%, 88%, 0.34)"
      }
    },
    {
      "id": "park",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "park",
      "filter": [
        "==",
        "$type",
        "Polygon"
      ],
      "paint": {
        "fill-color": "#d8e8c8",
        "fill-opacity": {
          "base": 1.8,
          "stops": [
            [
              9,
              0.5
            ],
            [
              12,
              0.2
            ]
          ]
        }
      }
    },
    {
      "id": "park-outline",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "park",
      "filter": [
        "==",
        "$type",
        "Polygon"
      ],
      "layout": {},
      "paint": {
        "line-color": {
          "base": 1,
          "stops": [
            [
              6,
              "hsla(96, 40%, 49%, 0.36)"
            ],
            [
              8,
              "hsla(96, 40%, 49%, 0.66)"
            ]
          ]
        },
        "line-dasharray": [
          3,
          3
        ]
      }
    },
    {
      "id": "landuse-cemetery",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "cemetery"
      ],
      "paint": {
        "fill-color": "#e0e4dd"
      }
    },
    {
      "id": "landuse-hospital",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "hospital"
      ],
      "paint": {
        "fill-color": "#fde"
      }
    },
    {
      "id": "landuse-school",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "school"
      ],
      "paint": {
        "fill-color": "#f0e8f8"
      }
    },
    {
      "id": "landuse-railway",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "landuse",
      "filter": [
        "==",
        "class",
        "railway"
      ],
      "paint": {
        "fill-color": "hsla(30, 19%, 90%, 0.4)"
      }
    },
    {
      "id": "landcover-wood",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "landcover",
      "filter": [
        "==",
        "class",
        "wood"
      ],
      "paint": {
        "fill-color": "#6a4",
        "fill-opacity": 0.1,
        "fill-outline-color": "hsla(0, 0%, 0%, 0.03)",
        "fill-antialias": {
          "base": 1,
          "stops": [
            [
              0,
              false
            ],
            [
              9,
              true
            ]
          ]
        }
      }
    },
    {
      "id": "landcover-grass",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "landcover",
      "filter": [
        "==",
        "class",
        "grass"
      ],
      "paint": {
        "fill-color": "#d8e8c8",
        "fill-opacity": 1
      }
    },
    {
      "id": "landcover-grass-park",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "park",
      "filter": [
        "==",
        "class",
        "public_park"
      ],
      "paint": {
        "fill-color": "#d8e8c8",
        "fill-opacity": 0.8
      }
    },
    {
      "id": "waterway_tunnel",
      "filter": [
        "all",
        [
          "in",
          "class",
          "river",
          "stream",
          "canal"
        ],
        [
          "==",
          "brunnel",
          "tunnel"
        ]
      ],
      "type": "line",
      "source": "ohm-data",
      "source-layer": "waterway",
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#a0c8f0",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              13,
              0.5
            ],
            [
              20,
              6
            ]
          ]
        },
        "line-dasharray": [
          2,
          4
        ]
      },
      "minzoom": 14
    },
    {
      "id": "waterway-other",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "waterway",
      "filter": [
        "!in",
        "class",
        "canal",
        "river",
        "stream"
      ],
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#a0c8f0",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              13,
              0.5
            ],
            [
              20,
              2
            ]
          ]
        }
      }
    },
    {
      "id": "waterway-stream-canal",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "waterway",
      "filter": [
        "all",
        [
          "in",
          "class",
          "canal",
          "stream"
        ],
        [
          "!=",
          "brunnel",
          "tunnel"
        ]
      ],
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#a0c8f0",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              13,
              0.5
            ],
            [
              20,
              6
            ]
          ]
        }
      }
    },
    {
      "id": "waterway-river",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "waterway",
      "filter": [
        "all",
        [
          "==",
          "class",
          "river"
        ],
        [
          "!=",
          "brunnel",
          "tunnel"
        ]
      ],
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#a0c8f0",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              10,
              0.8
            ],
            [
              20,
              6
            ]
          ]
        }
      }
    },
    {
      "id": "water-offset",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "water",
      "maxzoom": 8,
      "filter": [
        "==",
        "$type",
        "Polygon"
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-opacity": 1,
        "fill-color": "#a0c8f0",
        "fill-translate": {
          "base": 1,
          "stops": [
            [
              6,
              [
                2,
                0
              ]
            ],
            [
              8,
              [
                0,
                0
              ]
            ]
          ]
        }
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "water",
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "hsl(210, 67%, 85%)"
      }
    },
    {
      "id": "water-pattern",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "water",
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-translate": [
          0,
          2.5
        ],
        "fill-pattern": "wave"
      }
    },
    {
      "id": "landcover-ice-shelf",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "landcover",
      "filter": [
        "==",
        "subclass",
        "ice_shelf"
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#fff",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              0,
              0.9
            ],
            [
              10,
              0.3
            ]
          ]
        }
      }
    },
    {
      "id": "building",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "building",
      "paint": {
        "fill-color": {
          "base": 1,
          "stops": [
            [
              15.5,
              "#f2eae2"
            ],
            [
              16,
              "#dfdbd7"
            ]
          ]
        },
        "fill-antialias": true
      }
    },
    {
      "id": "building-top",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "building",
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-translate": {
          "base": 1,
          "stops": [
            [
              14,
              [
                0,
                0
              ]
            ],
            [
              16,
              [
                -2,
                -2
              ]
            ]
          ]
        },
        "fill-outline-color": "#dfdbd7",
        "fill-color": "#f2eae2",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              13,
              0
            ],
            [
              16,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-service-track-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "in",
          "class",
          "service",
          "track"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#cfcdca",
        "line-dasharray": [
          0.5,
          0.25
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              15,
              1
            ],
            [
              16,
              4
            ],
            [
              20,
              11
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-minor-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "==",
          "class",
          "minor"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#cfcdca",
        "line-opacity": {
          "stops": [
            [
              12,
              0
            ],
            [
              12.5,
              1
            ]
          ]
        },
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12,
              0.5
            ],
            [
              13,
              1
            ],
            [
              14,
              4
            ],
            [
              20,
              15
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-secondary-tertiary-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "in",
          "class",
          "secondary",
          "tertiary"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-opacity": 1,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              8,
              1.5
            ],
            [
              20,
              17
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-trunk-primary-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "in",
          "class",
          "primary",
          "trunk"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              5,
              0.4
            ],
            [
              6,
              0.6
            ],
            [
              7,
              1.5
            ],
            [
              20,
              22
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-motorway-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-dasharray": [
          0.5,
          0.25
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              5,
              0.4
            ],
            [
              6,
              0.6
            ],
            [
              7,
              1.5
            ],
            [
              20,
              22
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-path",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "brunnel",
            "tunnel"
          ],
          [
            "==",
            "class",
            "path"
          ]
        ]
      ],
      "paint": {
        "line-color": "#cba",
        "line-dasharray": [
          1.5,
          0.75
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              15,
              1.2
            ],
            [
              20,
              4
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-service-track",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "in",
          "class",
          "service",
          "track"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              15.5,
              0
            ],
            [
              16,
              2
            ],
            [
              20,
              7.5
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-minor",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "==",
          "class",
          "minor_road"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-opacity": 1,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              13.5,
              0
            ],
            [
              14,
              2.5
            ],
            [
              20,
              11.5
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-secondary-tertiary",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "in",
          "class",
          "secondary",
          "tertiary"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff4c6",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              6.5,
              0
            ],
            [
              7,
              0.5
            ],
            [
              20,
              10
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-trunk-primary",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "in",
          "class",
          "primary",
          "trunk"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff4c6",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              6.5,
              0
            ],
            [
              7,
              0.5
            ],
            [
              20,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-motorway",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#ffdaa6",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              6.5,
              0
            ],
            [
              7,
              0.5
            ],
            [
              20,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "tunnel-railway",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "tunnel"
        ],
        [
          "==",
          "class",
          "rail"
        ]
      ],
      "paint": {
        "line-color": "#bbb",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              14,
              0.4
            ],
            [
              15,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        "line-dasharray": [
          2,
          2
        ]
      }
    },
    {
      "id": "ferry",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "in",
          "class",
          "ferry"
        ]
      ],
      "layout": {
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(108, 159, 182, 1)",
        "line-width": 1.1,
        "line-dasharray": [
          2,
          2
        ]
      }
    },
    {
      "id": "aeroway-taxiway-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "aeroway",
      "minzoom": 12,
      "filter": [
        "all",
        [
          "in",
          "class",
          "taxiway"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(153, 153, 153, 1)",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              11,
              2
            ],
            [
              17,
              12
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "aeroway-runway-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "aeroway",
      "minzoom": 12,
      "filter": [
        "all",
        [
          "in",
          "class",
          "runway"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(153, 153, 153, 1)",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              11,
              5
            ],
            [
              17,
              55
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "aeroway-area",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "aeroway",
      "minzoom": 4,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "in",
          "class",
          "runway",
          "taxiway"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              13,
              0
            ],
            [
              14,
              1
            ]
          ]
        },
        "fill-color": "rgba(255, 255, 255, 1)"
      }
    },
    {
      "id": "aeroway-taxiway",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "aeroway",
      "minzoom": 4,
      "filter": [
        "all",
        [
          "in",
          "class",
          "taxiway"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              11,
              1
            ],
            [
              17,
              10
            ]
          ]
        },
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              11,
              0
            ],
            [
              12,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "aeroway-runway",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "aeroway",
      "minzoom": 4,
      "filter": [
        "all",
        [
          "in",
          "class",
          "runway"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              11,
              4
            ],
            [
              17,
              50
            ]
          ]
        },
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              11,
              0
            ],
            [
              12,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "highway-area",
      "type": "fill",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "==",
        "$type",
        "Polygon"
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "hsla(0, 0%, 89%, 0.56)",
        "fill-outline-color": "#cfcdca",
        "fill-opacity": 0.9,
        "fill-antialias": false
      }
    },
    {
      "id": "highway-motorway-link-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 12,
      "filter": [
        "all",
        [
          "!in",
          "brunnel",
          "bridge",
          "tunnel"
        ],
        [
          "==",
          "class",
          "motorway_link"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-opacity": 1,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12,
              1
            ],
            [
              13,
              3
            ],
            [
              14,
              4
            ],
            [
              20,
              15
            ]
          ]
        }
      }
    },
    {
      "id": "highway-link-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "all",
        [
          "!in",
          "brunnel",
          "bridge",
          "tunnel"
        ],
        [
          "in",
          "class",
          "primary_link",
          "secondary_link",
          "tertiary_link",
          "trunk_link"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-opacity": 1,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12,
              1
            ],
            [
              13,
              3
            ],
            [
              14,
              4
            ],
            [
              20,
              15
            ]
          ]
        }
      }
    },
    {
      "id": "highway-minor-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!=",
            "brunnel",
            "tunnel"
          ],
          [
            "in",
            "class",
            "minor",
            "service",
            "track"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#cfcdca",
        "line-opacity": {
          "stops": [
            [
              12,
              0
            ],
            [
              12.5,
              1
            ]
          ]
        },
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12,
              0.5
            ],
            [
              13,
              1
            ],
            [
              14,
              4
            ],
            [
              20,
              15
            ]
          ]
        }
      }
    },
    {
      "id": "highway-secondary-tertiary-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "!in",
          "brunnel",
          "bridge",
          "tunnel"
        ],
        [
          "in",
          "class",
          "secondary",
          "tertiary"
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-opacity": 1,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              8,
              1.5
            ],
            [
              20,
              17
            ]
          ]
        }
      }
    },
    {
      "id": "highway-primary-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 5,
      "filter": [
        "all",
        [
          "!in",
          "brunnel",
          "bridge",
          "tunnel"
        ],
        [
          "in",
          "class",
          "primary"
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-opacity": {
          "stops": [
            [
              7,
              0
            ],
            [
              8,
              1
            ]
          ]
        },
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              7,
              0
            ],
            [
              8,
              0.6
            ],
            [
              9,
              1.5
            ],
            [
              20,
              22
            ]
          ]
        }
      }
    },
    {
      "id": "highway-trunk-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 5,
      "filter": [
        "all",
        [
          "!in",
          "brunnel",
          "bridge",
          "tunnel"
        ],
        [
          "in",
          "class",
          "trunk"
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-opacity": {
          "stops": [
            [
              5,
              0
            ],
            [
              6,
              1
            ]
          ]
        },
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              5,
              0
            ],
            [
              6,
              0.6
            ],
            [
              7,
              1.5
            ],
            [
              20,
              22
            ]
          ]
        }
      }
    },
    {
      "id": "highway-motorway-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 4,
      "filter": [
        "all",
        [
          "!in",
          "brunnel",
          "bridge",
          "tunnel"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              4,
              0
            ],
            [
              5,
              0.4
            ],
            [
              6,
              0.6
            ],
            [
              7,
              1.5
            ],
            [
              20,
              22
            ]
          ]
        },
        "line-opacity": {
          "stops": [
            [
              4,
              0
            ],
            [
              5,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "highway-path",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!in",
            "brunnel",
            "bridge",
            "tunnel"
          ],
          [
            "==",
            "class",
            "path"
          ]
        ]
      ],
      "paint": {
        "line-color": "#cba",
        "line-dasharray": [
          1.5,
          0.75
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              15,
              1.2
            ],
            [
              20,
              4
            ]
          ]
        }
      }
    },
    {
      "id": "highway-motorway-link",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 12,
      "filter": [
        "all",
        [
          "!in",
          "brunnel",
          "bridge",
          "tunnel"
        ],
        [
          "==",
          "class",
          "motorway_link"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fc8",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12.5,
              0
            ],
            [
              13,
              1.5
            ],
            [
              14,
              2.5
            ],
            [
              20,
              11.5
            ]
          ]
        }
      }
    },
    {
      "id": "highway-link",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "all",
        [
          "!in",
          "brunnel",
          "bridge",
          "tunnel"
        ],
        [
          "in",
          "class",
          "primary_link",
          "secondary_link",
          "tertiary_link",
          "trunk_link"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fea",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12.5,
              0
            ],
            [
              13,
              1.5
            ],
            [
              14,
              2.5
            ],
            [
              20,
              11.5
            ]
          ]
        }
      }
    },
    {
      "id": "highway-minor",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!=",
            "brunnel",
            "tunnel"
          ],
          [
            "in",
            "class",
            "minor",
            "service",
            "track"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-opacity": 1,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              13.5,
              0
            ],
            [
              14,
              2.5
            ],
            [
              20,
              11.5
            ]
          ]
        }
      }
    },
    {
      "id": "highway-secondary-tertiary",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "!in",
          "brunnel",
          "bridge",
          "tunnel"
        ],
        [
          "in",
          "class",
          "secondary",
          "tertiary"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fea",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              6.5,
              0
            ],
            [
              8,
              0.5
            ],
            [
              20,
              13
            ]
          ]
        }
      }
    },
    {
      "id": "highway-primary",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!in",
            "brunnel",
            "bridge",
            "tunnel"
          ],
          [
            "in",
            "class",
            "primary"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fea",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              8.5,
              0
            ],
            [
              9,
              0.5
            ],
            [
              20,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "highway-trunk",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!in",
            "brunnel",
            "bridge",
            "tunnel"
          ],
          [
            "in",
            "class",
            "trunk"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fea",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              6.5,
              0
            ],
            [
              7,
              0.5
            ],
            [
              20,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "highway-motorway",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 5,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!in",
            "brunnel",
            "bridge",
            "tunnel"
          ],
          [
            "==",
            "class",
            "motorway"
          ]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fc8",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              6.5,
              0
            ],
            [
              7,
              0.5
            ],
            [
              20,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "railway-transit",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "class",
            "transit"
          ],
          [
            "!in",
            "brunnel",
            "tunnel"
          ]
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 73%, 0.77)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              14,
              0.4
            ],
            [
              20,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "railway-transit-hatching",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "class",
            "transit"
          ],
          [
            "!in",
            "brunnel",
            "tunnel"
          ]
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 73%, 0.68)",
        "line-dasharray": [
          0.2,
          8
        ],
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              14.5,
              0
            ],
            [
              15,
              2
            ],
            [
              20,
              6
            ]
          ]
        }
      }
    },
    {
      "id": "railway-service",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "class",
            "rail"
          ],
          [
            "has",
            "service"
          ]
        ]
      ],
      "paint": {
        "line-color": "hsla(0, 0%, 73%, 0.77)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              14,
              0.4
            ],
            [
              20,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "railway-service-hatching",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "class",
            "rail"
          ],
          [
            "has",
            "service"
          ]
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 73%, 0.68)",
        "line-dasharray": [
          0.2,
          8
        ],
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              14.5,
              0
            ],
            [
              15,
              2
            ],
            [
              20,
              6
            ]
          ]
        }
      }
    },
    {
      "id": "railway",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!has",
            "service"
          ],
          [
            "!in",
            "brunnel",
            "bridge",
            "tunnel"
          ],
          [
            "==",
            "class",
            "rail"
          ]
        ]
      ],
      "paint": {
        "line-color": "#bbb",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              14,
              0.4
            ],
            [
              15,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        }
      }
    },
    {
      "id": "railway-hatching",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "!has",
            "service"
          ],
          [
            "!in",
            "brunnel",
            "bridge",
            "tunnel"
          ],
          [
            "==",
            "class",
            "rail"
          ]
        ]
      ],
      "paint": {
        "line-color": "#bbb",
        "line-dasharray": [
          0.2,
          8
        ],
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              14.5,
              0
            ],
            [
              15,
              3
            ],
            [
              20,
              8
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-motorway-link-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "==",
          "class",
          "motorway_link"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-opacity": 1,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12,
              1
            ],
            [
              13,
              3
            ],
            [
              14,
              4
            ],
            [
              20,
              15
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-link-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "in",
          "class",
          "primary_link",
          "secondary_link",
          "tertiary_link",
          "trunk_link"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-opacity": 1,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12,
              1
            ],
            [
              13,
              3
            ],
            [
              14,
              4
            ],
            [
              20,
              15
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-secondary-tertiary-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "in",
          "class",
          "secondary",
          "tertiary"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-opacity": 1,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              8,
              1.5
            ],
            [
              20,
              28
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-trunk-primary-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "in",
          "class",
          "primary",
          "trunk"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(28, 76%, 67%)",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              5,
              0.4
            ],
            [
              6,
              0.6
            ],
            [
              7,
              1.5
            ],
            [
              20,
              26
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-motorway-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#e9ac77",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              5,
              0.4
            ],
            [
              6,
              0.6
            ],
            [
              7,
              1.5
            ],
            [
              20,
              22
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-path-casing",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "brunnel",
            "bridge"
          ],
          [
            "==",
            "class",
            "path"
          ]
        ]
      ],
      "paint": {
        "line-color": "#f8f4f0",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              15,
              1.2
            ],
            [
              20,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-path",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "brunnel",
            "bridge"
          ],
          [
            "==",
            "class",
            "path"
          ]
        ]
      ],
      "paint": {
        "line-color": "#cba",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              15,
              1.2
            ],
            [
              20,
              4
            ]
          ]
        },
        "line-dasharray": [
          1.5,
          0.75
        ]
      }
    },
    {
      "id": "bridge-motorway-link",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "==",
          "class",
          "motorway_link"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fc8",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12.5,
              0
            ],
            [
              13,
              1.5
            ],
            [
              14,
              2.5
            ],
            [
              20,
              11.5
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-link",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "in",
          "class",
          "primary_link",
          "secondary_link",
          "tertiary_link",
          "trunk_link"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fea",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12.5,
              0
            ],
            [
              13,
              1.5
            ],
            [
              14,
              2.5
            ],
            [
              20,
              11.5
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-secondary-tertiary",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "in",
          "class",
          "secondary",
          "tertiary"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fea",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              6.5,
              0
            ],
            [
              7,
              0.5
            ],
            [
              20,
              20
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-trunk-primary",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "in",
          "class",
          "primary",
          "trunk"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fea",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              6.5,
              0
            ],
            [
              7,
              0.5
            ],
            [
              20,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-motorway",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fc8",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              6.5,
              0
            ],
            [
              7,
              0.5
            ],
            [
              20,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-railway",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "==",
          "class",
          "rail"
        ]
      ],
      "paint": {
        "line-color": "#bbb",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              14,
              0.4
            ],
            [
              15,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-railway-hatching",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "brunnel",
          "bridge"
        ],
        [
          "==",
          "class",
          "rail"
        ]
      ],
      "paint": {
        "line-color": "#bbb",
        "line-dasharray": [
          0.2,
          8
        ],
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              14.5,
              0
            ],
            [
              15,
              3
            ],
            [
              20,
              8
            ]
          ]
        }
      }
    },
    {
      "id": "cablecar",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "==",
        "class",
        "cable_car"
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 70%)",
        "line-width": {
          "base": 1,
          "stops": [
            [
              11,
              1
            ],
            [
              19,
              2.5
            ]
          ]
        }
      }
    },
    {
      "id": "cablecar-dash",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "==",
        "class",
        "cable_car"
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 70%)",
        "line-width": {
          "base": 1,
          "stops": [
            [
              11,
              3
            ],
            [
              19,
              5.5
            ]
          ]
        },
        "line-dasharray": [
          2,
          3
        ]
      }
    },
    {
      "id": "boundary-land-level-4",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "boundary",
      "filter": [
        "all",
        [
          ">=",
          "admin_level",
          4
        ],
        [
          "<=",
          "admin_level",
          8
        ],
        [
          "!=",
          "maritime",
          1
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#9e9cab",
        "line-dasharray": [
          3,
          1,
          1,
          1
        ],
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              4,
              0.4
            ],
            [
              5,
              1
            ],
            [
              12,
              3
            ]
          ]
        }
      }
    },
    {
      "id": "boundary-land-level-2",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "boundary",
      "filter": [
        "all",
        [
          "==",
          "admin_level",
          2
        ],
        [
          "!=",
          "maritime",
          1
        ],
        [
          "!=",
          "disputed",
          1
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(248, 7%, 66%)",
        "line-width": {
          "base": 1,
          "stops": [
            [
              0,
              0.6
            ],
            [
              4,
              1.4
            ],
            [
              5,
              2
            ],
            [
              12,
              8
            ]
          ]
        }
      }
    },
    {
      "id": "boundary-land-disputed",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "boundary",
      "filter": [
        "all",
        [
          "!=",
          "maritime",
          1
        ],
        [
          "==",
          "disputed",
          1
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(248, 7%, 70%)",
        "line-dasharray": [
          1,
          3
        ],
        "line-width": {
          "base": 1,
          "stops": [
            [
              0,
              0.6
            ],
            [
              4,
              1.4
            ],
            [
              5,
              2
            ],
            [
              12,
              8
            ]
          ]
        }
      }
    },
    {
      "id": "boundary-water",
      "type": "line",
      "source": "ohm-data",
      "source-layer": "boundary",
      "filter": [
        "all",
        [
          "in",
          "admin_level",
          2,
          4
        ],
        [
          "==",
          "maritime",
          1
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "rgba(154, 189, 214, 1)",
        "line-width": {
          "base": 1,
          "stops": [
            [
              0,
              0.6
            ],
            [
              4,
              1.4
            ],
            [
              5,
              2
            ],
            [
              12,
              8
            ]
          ]
        },
        "line-opacity": {
          "stops": [
            [
              6,
              0.6
            ],
            [
              10,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "waterway-name",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "waterway",
      "minzoom": 13,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "has",
          "name"
        ]
      ],
      "layout": {
        "text-font": [
          "Noto Sans Italic"
        ],
        "text-size": 14,
        "text-field": "{name}",
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "symbol-placement": "line",
        "text-letter-spacing": 0.2,
        "symbol-spacing": 350
      },
      "paint": {
        "text-color": "#74aee9",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(255,255,255,0.7)"
      }
    },
    {
      "id": "water-name-lakeline",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "water_name",
      "filter": [
        "==",
        "$type",
        "LineString"
      ],
      "layout": {
        "text-font": [
          "Noto Sans Italic"
        ],
        "text-size": 14,
        "text-field": "{name}",
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "symbol-placement": "line",
        "symbol-spacing": 350,
        "text-letter-spacing": 0.2
      },
      "paint": {
        "text-color": "#74aee9",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(255,255,255,0.7)"
      }
    },
    {
      "id": "water-name-ocean",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "water_name",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "ocean"
        ]
      ],
      "layout": {
        "text-font": [
          "Noto Sans Italic"
        ],
        "text-size": 14,
        "text-field": "{name}",
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "symbol-placement": "point",
        "symbol-spacing": 350,
        "text-letter-spacing": 0.2
      },
      "paint": {
        "text-color": "#74aee9",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(255,255,255,0.7)"
      }
    },
    {
      "id": "water-name-other",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "water_name",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "!in",
          "class",
          "ocean"
        ]
      ],
      "layout": {
        "text-font": [
          "Noto Sans Italic"
        ],
        "text-size": {
          "stops": [
            [
              0,
              10
            ],
            [
              6,
              14
            ]
          ]
        },
        "text-field": "{name}",
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "symbol-placement": "point",
        "symbol-spacing": 350,
        "text-letter-spacing": 0.2,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "#74aee9",
        "text-halo-width": 1.5,
        "text-halo-color": "rgba(255,255,255,0.7)"
      }
    },
    {
      "id": "poi-level-3",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "poi",
      "minzoom": 16,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          ">=",
          "rank",
          25
        ]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-anchor": "top",
        "icon-image": "{class}_11",
        "text-field": "{name}",
        "text-offset": [
          0,
          0.6
        ],
        "text-size": 12,
        "text-max-width": 9
      },
      "paint": {
        "text-halo-blur": 0.5,
        "text-color": "#666",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-2",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "poi",
      "minzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "<=",
          "rank",
          24
        ],
        [
          ">=",
          "rank",
          15
        ]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-anchor": "top",
        "icon-image": "{class}_11",
        "text-field": "{name}",
        "text-offset": [
          0,
          0.6
        ],
        "text-size": 12,
        "text-max-width": 9
      },
      "paint": {
        "text-halo-blur": 0.5,
        "text-color": "#666",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-level-1",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "poi",
      "minzoom": 14,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "<=",
          "rank",
          14
        ],
        [
          "has",
          "name"
        ]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-anchor": "top",
        "icon-image": "{class}_11",
        "text-field": "{name}",
        "text-offset": [
          0,
          0.6
        ],
        "text-size": 12,
        "text-max-width": 9
      },
      "paint": {
        "text-halo-blur": 0.5,
        "text-color": "#666",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "poi-railway",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "poi",
      "minzoom": 13,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "has",
          "name"
        ],
        [
          "==",
          "class",
          "railway"
        ],
        [
          "==",
          "subclass",
          "station"
        ]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-anchor": "top",
        "icon-image": "{class}_11",
        "text-field": "{name}",
        "text-offset": [
          0,
          0.6
        ],
        "text-size": 12,
        "text-max-width": 9,
        "icon-optional": false,
        "icon-ignore-placement": false,
        "icon-allow-overlap": false,
        "text-ignore-placement": false,
        "text-allow-overlap": false,
        "text-optional": true
      },
      "paint": {
        "text-halo-blur": 0.5,
        "text-color": "#666",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "road_oneway",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "oneway",
          1
        ],
        [
          "in",
          "class",
          "motorway",
          "trunk",
          "primary",
          "secondary",
          "tertiary",
          "minor",
          "service"
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "icon-image": "oneway",
        "symbol-spacing": 75,
        "icon-padding": 2,
        "icon-rotation-alignment": "map",
        "icon-rotate": 90,
        "icon-size": {
          "stops": [
            [
              15,
              0.5
            ],
            [
              19,
              1
            ]
          ]
        }
      },
      "paint": {
        "icon-opacity": 0.5
      }
    },
    {
      "id": "road_oneway_opposite",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "transportation",
      "minzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "oneway",
          -1
        ],
        [
          "in",
          "class",
          "motorway",
          "trunk",
          "primary",
          "secondary",
          "tertiary",
          "minor",
          "service"
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "icon-image": "oneway",
        "symbol-spacing": 75,
        "icon-padding": 2,
        "icon-rotation-alignment": "map",
        "icon-rotate": -90,
        "icon-size": {
          "stops": [
            [
              15,
              0.5
            ],
            [
              19,
              1
            ]
          ]
        }
      },
      "paint": {
        "icon-opacity": 0.5
      }
    },
    {
      "id": "highway-name-path",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "transportation_name",
      "minzoom": 15.5,
      "filter": [
        "==",
        "class",
        "path"
      ],
      "layout": {
        "text-size": {
          "base": 1,
          "stops": [
            [
              13,
              12
            ],
            [
              14,
              13
            ]
          ]
        },
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-field": "{name}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map"
      },
      "paint": {
        "text-halo-color": "#f8f4f0",
        "text-color": "hsl(30, 23%, 62%)",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "highway-name-minor",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "transportation_name",
      "minzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "minor",
          "service",
          "track"
        ]
      ],
      "layout": {
        "text-size": {
          "base": 1,
          "stops": [
            [
              13,
              12
            ],
            [
              14,
              13
            ]
          ]
        },
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-field": "{name}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map"
      },
      "paint": {
        "text-halo-blur": 0.5,
        "text-color": "#765",
        "text-halo-width": 1
      }
    },
    {
      "id": "highway-name-major",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "transportation_name",
      "minzoom": 12.2,
      "filter": [
        "in",
        "class",
        "primary",
        "secondary",
        "tertiary",
        "trunk"
      ],
      "layout": {
        "text-size": {
          "base": 1,
          "stops": [
            [
              13,
              12
            ],
            [
              14,
              13
            ]
          ]
        },
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-field": "{name}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map"
      },
      "paint": {
        "text-halo-blur": 0.5,
        "text-color": "#765",
        "text-halo-width": 1
      }
    },
    {
      "id": "highway-shield",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "transportation_name",
      "minzoom": 8,
      "filter": [
        "all",
        [
          "<=",
          "ref_length",
          6
        ],
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "!in",
          "network",
          "us-interstate",
          "us-highway",
          "us-state"
        ]
      ],
      "layout": {
        "text-size": 10,
        "icon-image": "road_{ref_length}",
        "icon-rotation-alignment": "viewport",
        "symbol-spacing": 200,
        "text-font": [
          "Noto Sans Regular"
        ],
        "symbol-placement": {
          "base": 1,
          "stops": [
            [
              10,
              "point"
            ],
            [
              11,
              "line"
            ]
          ]
        },
        "text-rotation-alignment": "viewport",
        "icon-size": 1,
        "text-field": "{ref}"
      },
      "paint": {}
    },
    {
      "id": "highway-shield-us-interstate",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "transportation_name",
      "minzoom": 7,
      "filter": [
        "all",
        [
          "<=",
          "ref_length",
          6
        ],
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "network",
          "us-interstate"
        ]
      ],
      "layout": {
        "text-size": 10,
        "icon-image": "{network}_{ref_length}",
        "icon-rotation-alignment": "viewport",
        "symbol-spacing": 200,
        "text-font": [
          "Noto Sans Regular"
        ],
        "symbol-placement": {
          "base": 1,
          "stops": [
            [
              7,
              "point"
            ],
            [
              7,
              "line"
            ],
            [
              8,
              "line"
            ]
          ]
        },
        "text-rotation-alignment": "viewport",
        "icon-size": 1,
        "text-field": "{ref}"
      },
      "paint": {
        "text-color": "rgba(0, 0, 0, 1)"
      }
    },
    {
      "id": "highway-shield-us-other",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "transportation_name",
      "minzoom": 9,
      "filter": [
        "all",
        [
          "<=",
          "ref_length",
          6
        ],
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "network",
          "us-highway",
          "us-state"
        ]
      ],
      "layout": {
        "text-size": 10,
        "icon-image": "{network}_{ref_length}",
        "icon-rotation-alignment": "viewport",
        "symbol-spacing": 200,
        "text-font": [
          "Noto Sans Regular"
        ],
        "symbol-placement": {
          "base": 1,
          "stops": [
            [
              10,
              "point"
            ],
            [
              11,
              "line"
            ]
          ]
        },
        "text-rotation-alignment": "viewport",
        "icon-size": 1,
        "text-field": "{ref}"
      },
      "paint": {
        "text-color": "rgba(0, 0, 0, 1)"
      }
    },
    {
      "id": "airport-label-major",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "aerodrome_label",
      "minzoom": 10,
      "filter": [
        "all",
        [
          "has",
          "iata"
        ]
      ],
      "layout": {
        "text-padding": 2,
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-anchor": "top",
        "icon-image": "airport_11",
        "text-field": "{name}",
        "text-offset": [
          0,
          0.6
        ],
        "text-size": 12,
        "text-max-width": 9,
        "visibility": "visible",
        "icon-size": 1,
        "text-optional": true
      },
      "paint": {
        "text-halo-blur": 0.5,
        "text-color": "#666",
        "text-halo-width": 1,
        "text-halo-color": "#ffffff"
      }
    },
    {
      "id": "place-other",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "place",
      "filter": [
        "!in",
        "class",
        "city",
        "town",
        "village",
        "country",
        "continent"
      ],
      "layout": {
        "text-letter-spacing": 0.1,
        "text-size": {
          "base": 1.2,
          "stops": [
            [
              12,
              10
            ],
            [
              15,
              14
            ]
          ]
        },
        "text-font": [
          "Noto Sans Bold"
        ],
        "text-field": "{name}",
        "text-transform": "uppercase",
        "text-max-width": 9,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "#633",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)"
      }
    },
    {
      "id": "place-village",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "place",
      "filter": [
        "==",
        "class",
        "village"
      ],
      "layout": {
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-size": {
          "base": 1.2,
          "stops": [
            [
              10,
              12
            ],
            [
              15,
              22
            ]
          ]
        },
        "text-field": "{name}",
        "text-max-width": 8,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)"
      }
    },
    {
      "id": "place-town",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "place",
      "filter": [
        "==",
        "class",
        "town"
      ],
      "layout": {
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-size": {
          "base": 1.2,
          "stops": [
            [
              10,
              14
            ],
            [
              15,
              24
            ]
          ]
        },
        "text-field": "{name}",
        "text-max-width": 8,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)"
      }
    },
    {
      "id": "place-city",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "place",
      "filter": [
        "all",
        [
          "!=",
          "capital",
          2
        ],
        [
          "==",
          "class",
          "city"
        ]
      ],
      "layout": {
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-size": {
          "base": 1.2,
          "stops": [
            [
              7,
              14
            ],
            [
              11,
              24
            ]
          ]
        },
        "text-field": "{name}",
        "text-max-width": 8,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)"
      }
    },
    {
      "id": "place-city-capital",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "place",
      "filter": [
        "all",
        [
          "==",
          "capital",
          2
        ],
        [
          "==",
          "class",
          "city"
        ]
      ],
      "layout": {
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-size": {
          "base": 1.2,
          "stops": [
            [
              7,
              14
            ],
            [
              11,
              24
            ]
          ]
        },
        "text-field": "{name}",
        "text-max-width": 8,
        "icon-image": "star_11",
        "text-offset": [
          0.4,
          0
        ],
        "icon-size": 0.8,
        "text-anchor": "left",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "#333",
        "text-halo-width": 1.2,
        "text-halo-color": "rgba(255,255,255,0.8)"
      }
    },
    {
      "id": "place-country-other",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "place",
      "filter": [
        "all",
        [
          "==",
          "class",
          "country"
        ],
        [
          ">=",
          "rank",
          3
        ],
        [
          "!has",
          "iso_a2"
        ]
      ],
      "layout": {
        "text-font": [
          "Noto Sans Italic"
        ],
        "text-field": "{name}",
        "text-size": {
          "stops": [
            [
              3,
              11
            ],
            [
              7,
              17
            ]
          ]
        },
        "text-transform": "uppercase",
        "text-max-width": 6.25,
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "#334",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255,255,255,0.8)"
      }
    },
    {
      "id": "place-country-3",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "place",
      "filter": [
        "all",
        [
          "==",
          "class",
          "country"
        ],
        [
          ">=",
          "rank",
          3
        ],
        [
          "has",
          "iso_a2"
        ]
      ],
      "layout": {
        "text-font": [
          "Noto Sans Bold"
        ],
        "text-field": "{name}",
        "text-size": {
          "stops": [
            [
              3,
              11
            ],
            [
              7,
              17
            ]
          ]
        },
        "text-transform": "uppercase",
        "text-max-width": 6.25,
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "#334",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255,255,255,0.8)"
      }
    },
    {
      "id": "place-country-2",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "place",
      "filter": [
        "all",
        [
          "==",
          "class",
          "country"
        ],
        [
          "==",
          "rank",
          2
        ],
        [
          "has",
          "iso_a2"
        ]
      ],
      "layout": {
        "text-font": [
          "Noto Sans Bold"
        ],
        "text-field": "{name}",
        "text-size": {
          "stops": [
            [
              2,
              11
            ],
            [
              5,
              17
            ]
          ]
        },
        "text-transform": "uppercase",
        "text-max-width": 6.25,
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "#334",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255,255,255,0.8)"
      }
    },
    {
      "id": "place-country-1",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "place",
      "filter": [
        "all",
        [
          "==",
          "class",
          "country"
        ],
        [
          "==",
          "rank",
          1
        ],
        [
          "has",
          "iso_a2"
        ]
      ],
      "layout": {
        "text-font": [
          "Noto Sans Bold"
        ],
        "text-field": "{name}",
        "text-size": {
          "stops": [
            [
              1,
              11
            ],
            [
              4,
              17
            ]
          ]
        },
        "text-transform": "uppercase",
        "text-max-width": 6.25,
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "#334",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255,255,255,0.8)"
      }
    },
    {
      "id": "place-continent",
      "type": "symbol",
      "source": "ohm-data",
      "source-layer": "place",
      "maxzoom": 1,
      "filter": [
        "==",
        "class",
        "continent"
      ],
      "layout": {
        "text-font": [
          "Noto Sans Bold"
        ],
        "text-field": "{name}",
        "text-size": 14,
        "text-max-width": 6.25,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-halo-blur": 1,
        "text-color": "#334",
        "text-halo-width": 2,
        "text-halo-color": "rgba(255,255,255,0.8)"
      }
    },
  ]
};
export const defaultSources = [
  {
    id: "buildingTile",
    copyright: [],
    type: "tile",
    card: {
      title: ["addr:street", "addr:housenumber"],
      blocks: [
        { type: "value", id: "building:management" },
        { type: "value", id: "building:health" },
        { type: "value", id: "building:series" },
        { type: "value", id: "building:levels" },
        { type: "divider" },
        { type: "value", id: "start_date" },
        { type: "age", id: "building:age", deps: "start_date" },
      ],
    },
    properties: [
      {
        title: "Когда построили",
        id: "start_date",
        values: [
          { from: 1723, to: 1860, color: "#ff7461", value: 0 },
          { from: 1860, to: 1917, color: "#ffA34e", value: 1 },
          { from: 1917, to: 1930, color: "#fee678", value: 1 },
          { from: 1930, to: 1940, color: "#85e634", value: 1 },
          { from: 1940, to: 1955, color: "#0f9467", value: 0 },
          { from: 1955, to: 1991, color: "#71b3ff", value: 7 },
          { from: 1991, to: 2010, color: "#c270ff", value: 4 },
          { from: 2010, to: 2023, color: "#f97bcf", value: 6 },
        ],
      },
      {
        title: "Количество этажей",
        id: "building:levels",
        values: [
          { from: 1, to: 3, color: "#006adb", value: 11656 },
          { from: 3, to: 5, color: "#0084e2", value: 3172 },
          { from: 5, to: 9, color: "#009ee1", value: 3380 },
          { from: 9, to: 12, color: "#00b7d9", value: 1929 },
          { from: 12, to: 16, color: "#00cfc5", value: 664 },
          { from: 16, to: 21, color: "#00e7a3", value: 320 },
          { from: 21, to: 25, color: "#72f674", value: 8 },
          { from: 25, to: 31, color: "#c0fc49", value: 0 },
          { from: 31, to: 52, color: "#ffea00", value: 0 },
        ],
      },
      {
        id: "osm:id",
        title: "Osm ID",
      },
      {
        id: "addr:street",
        title: "Улица",
      },
      {
        id: "addr:housenumber",
        title: "Номер дома",
      },
      {
        id: "age",
        title: "Возраст здания",
        deps: "start_date",
      },
      {
        id: "building:age",
        title: "Возраст здания",
      },
    ],
  },
  {
    id: "armenianPostBranchesLayerSource",
    path: "/postalindex_ru.json",
    type: "json",
    card: {
      title: "address",
      blocks: [
        { type: "value", id: "postal_code" },
        { type: "value", id: "work_days" },
        { type: "value", id: "work_days_break_time" },
        { type: "value", id: "work_days_outside" },
        { type: "value", id: "saturday" },
        { type: "value", id: "saturday_break_time" },
        { type: "value", id: "saturday_outside" },
        { type: "value", id: "sunday" },
        { type: "value", id: "sunday_break_time" },
        { type: "value", id: "sunday_outside" },
      ],
    },
    copyright: [],
    properties: [
      {
        id: "postal_code",
        title: "Почтовый индекс",
      },
      {
        id: "work_days",
        title: "Время работы в пн–пт",
      },
      {
        id: "work_days_break_time",
        title: "Перерыв в пн–пт",
      },
      {
        id: "work_days_outside",
        title: "«На районе» в пн–пт",
      },
      {
        id: "saturday",
        title: "Время работы в сб",
      },
      {
        id: "saturday_break_time",
        title: "Перерыв в сб",
      },
      {
        id: "saturday_outside",
        title: "«На районе» в сб",
      },
      {
        id: "sunday",
        title: "Время работы в вс",
      },
      {
        id: "sunday_break_time",
        title: "Перерыв в вс",
      },
      {
        id: "sunday_outside",
        title: "«На районе» в вс",
      },
    ],
    latProperty: "lat",
    lngProperty: "long",
  },
  {
    id: "armenianSeismicZonesLayerSource",
    path: "/seismic_zones.json",
    type: "geojson",
    projection: "EPSG:32638",
    card: {
      blocks: [
        {
          type: "value",
          id: "Zone",
        },
        {
          type: "value",
          id: "Area_km2",
        },
        {
          type: "value",
          id: "Zone_g",
        },
      ],
    },
    properties: [
      {
        id: "Zone",
        title: "Сейсмическая зона",
        values: {
          I: {
            color: "#ffdd33",
          },
          II: {
            color: "#ff9933",
          },
          III: {
            color: "#ff3311",
          },
        },
      },
      {
        id: "Area_km2",
        title: "Площадь, км²",
      },
      {
        id: "Zone_g",
        title: "Сила тяжести, g",
      },
    ],
    copyright: [],
  },
  {
    id: "armenianLandslidesLayerSource",
    path: "/landslides.json",
    type: "geojson",
    projection: "EPSG:32638",
    card: {
      title: "Name_eng",
      blocks: [],
    },
    properties: [],
    copyright: [],
  },
  {
    id: "armenianSoilTypesLayerSource",
    path: "/soil_types.json",
    type: "geojson",
    projection: "EPSG:32638",
    card: {
      blocks: [
        {
          type: "tag",
          id: "Tip",
        },
        {
          type: "value",
          id: "Descriptio",
        },
        {
          type: "value",
          id: "Shape_Area",
        },
      ],
    },
    properties: [
      {
        id: "Descriptio",
        title: "Описание",
        values: {
          "Alluvial-meadow saline lands and alkali soils": {
            color: "#9ddcda",
            title: "Alluvial-meadow saline lands and alkali soils",
          },
          "Alluvial-meadow soils irrigated also in the past": {
            color: "#2fc9dd",
            title: "Alluvial-meadow soils irrigated also in the past",
          },
          "Alpine mountaine-medow turf-peat soils": {
            color: "#85b70f",
            title: "Alpine mountaine-medow turf-peat soils",
          },
          "Brown mountainous-forest soils of dry firests and bushes": {
            color: "#b98746",
            title: "Brown mountainous-forest soils of dry firests and bushes",
          },
          "Brown mountainous-forest soils of moderately humid forests": {
            color: "#d6a15c",
            title: "Brown mountainous-forest soils of moderately humid forests",
          },
          "Desalinated here and there fat mountainous black soils of humid steppe":
            {
              color: "#75552c",
              title:
                "Desalinated here and there fat mountainous black soils of humid steppe",
            },
          "Gray mountainous here and there gypsiferous & saline soils": {
            color: "#979797",
            title: "Gray mountainous here and there gypsiferous & saline soils",
          },
          "Gypsiferous and here and there saline colored soils": {
            color: "#d1dbdd",
            title: "Gypsiferous and here and there saline colored soils",
          },
          "Lake Sevan's outcropped bottomlands": {
            color: "#2863da",
            title: "Lake Sevan's outcropped bottomlands",
          },
          "Meadow saline lands and alkali soils": {
            color: "#bedd74",
            title: "Meadow saline lands and alkali soils",
          },
          "Meadow-marshy soils": {
            color: "#0fbf6a",
            title: "Meadow-marshy soils",
          },
          "Mountain-fulvous soils of dry steppes": {
            color: "#dbb3bc",
            title: "Mountain-fulvous soils of dry steppes",
          },
          "Mountainous carbonated and typical black soils with weakly developed black soils of moderately humid steppes":
            {
              color: "#eecec1",
              title:
                "Mountainous carbonated and typical black soils with weakly developed black soils of moderately humid steppes",
            },
          "Mountainous-forest steppe soils": {
            color: "#677288",
            title: "Mountainous-forest steppe soils",
          },
          "Non-developed soils of snow-closed zone": {
            color: "#edec8d",
            title: "Non-developed soils of snow-closed zone",
          },
          "Subalpian mountain-medow black soil-like": {
            color: "#565b0c",
            title: "Subalpian mountain-medow black soil-like",
          },
          "Subalpian mountain-medow brown soils": {
            color: "#8f5a21",
            title: "Subalpian mountain-medow brown soils",
          },
          "Watered and irrigated also in the past cultivated gray mountainous soils":
            {
              color: "#388ef0",
              title:
                "Watered and irrigated also in the past cultivated gray mountainous soils",
            },
        },
      },
      {
        id: "Tip",
        title: "Тип",
        values: {
          "Alpine Soils": {
            color: "#986039",
          },
          "Mountain-steppe soils": {
            color: "#b47e00",
          },
          "Mountanious-forest soils": {
            color: "#99a300",
          },
          "Desert soils": {
            color: "#bc9b85",
          },
          "Mountanious stony semidesert soils": {
            color: "#c3bebd",
          },
        },
      },
      {
        id: "Shape_Area",
        title: "Площадь, м²",
      },
    ],
    copyright: [],
  },
  {
    id: "armenianLandUseLayerSource",
    path: "/land_use.json",
    type: "geojson",
    projection: "EPSG:32638",
    card: {
      blocks: [
        {
          type: "value",
          id: "Landuse",
        },
        {
          type: "value",
          id: "Shape_Area",
        },
      ],
    },
    properties: [
      {
        id: "Landuse",
        title: "Тип землепользования",
        values: {
          "Arable land": {
            title: "Arable land",
            color: "#fdad51",
          },
          Crops: {
            title: "Crops",
            color: "#a06525",
          },
          "Forest, shrubland": {
            title: "Forest, shrubland",
            color: "#217c16",
          },
          Grassland: {
            title: "Grassland",
            color: "#5dba26",
          },
          "Lakes, reservoirs": {
            title: "Lakes, reservoirs",
            color: "#a5bfdd",
          },
          Pastures: {
            title: "Pastures",
            color: "#81fb44",
          },
          "Yerevan city": {
            title: "Yerevan city",
            color: "#eb3a09",
          },
        },
      },
      {
        id: "Shape_Area",
        title: "Площадь, м²",
      },
    ],
    copyright: [],
  },
  {
    id: "armenianVegetationTypesLayerSource",
    path: "/vegetation_types.json",
    type: "geojson",
    projection: "EPSG:28408",
    card: {
      blocks: [
        {
          type: "value",
          id: "Veget_zone",
        },
        {
          type: "value",
          id: "Area",
        },
      ],
    },
    properties: [
      {
        id: "Area",
        title: "Площадь, м²",
      },
      {
        id: "Veget_zone",
        title: "Зона",
        values: {
          "Alpine medows and dense turf formations": {
            title: "Alpine medows and dense turf formations",
            color: "#02e409",
          },
          "Beech, oak and hornbeam forests": {
            title: "Beech, oak and hornbeam forests",
            color: "#1fa000",
          },
          "Cereal and motley grass steppe with  tragacanth": {
            title: "Cereal and motley grass steppe with  tragacanth",
            color: "#ceea80",
          },
          "Coniferous and deciduous sparse trees": {
            title: "Coniferous and deciduous sparse trees",
            color: "#187403",
          },
          "Forests  of eastern oak": {
            title: "Forests  of eastern oak",
            color: "#2dc61e",
          },
          "Grassland steppe": {
            title: "Grassland steppe",
            color: "#b9e44b",
          },
          "Halophilous deserts (halophytic and others)": {
            title: "Halophilous deserts (halophytic and others)",
            color: "#ecf778",
          },
          "Lake Arpilich": {
            title: "Lake Arpilich",
            color: "#3196ff",
          },
          "Lake Sevan": {
            title: "Lake Sevan",
            color: "#3196ff",
          },
          "Lower alpine medows": {
            title: "Lower alpine medows",
            color: "#95eb6f",
          },
          "Mixed oak and hornbeam forests": {
            title: "Mixed oak and hornbeam forests",
            color: "#5bae75",
          },
          "Psammophilous deserts": {
            title: "Psammophilous deserts",
            color: "#e3d612",
          },
          "Vegetation of exposed soils": {
            title: "Vegetation of exposed soils",
            color: "#95aba8",
          },
          "Water-marsh vegetation": {
            title: "Water-marsh vegetation",
            color: "#87d4b4",
          },
          "Wormwood semi-deserts (sweet wormwood)": {
            title: "Wormwood semi-deserts (sweet wormwood)",
            color: "#e9da81",
          },
          "Xerophilous bushes and grasses": {
            title: "Xerophilous bushes and grasses",
            color: "#c9d05f",
          },
        },
      },
    ],
    copyright: [],
  },
  {
    id: "armenianForestAreasLayerSource",
    path: "/forested_areas.json",
    type: "geojson",
    projection: "EPSG:32638",
    card: {
      blocks: [
        {
          type: "value",
          id: "OBJECTID",
        },
        {
          type: "value",
          id: "Shape_Area",
        },
      ],
    },
    properties: [
      {
        id: "OBJECTID",
        title: "ID",
      },
      {
        id: "Shape_Area",
        title: "Площадь, м²",
      },
    ],
    copyright: [],
  },
  {
    id: "armenianRadiationBalanceLayerSource",
    path: "/radiation_bal.json",
    type: "geojson",
    projection: "EPSG:28408",
    card: {
      blocks: [
        {
          type: "value",
          id: "VALUE",
        },
      ],
    },
    properties: [
      {
        id: "VALUE",
        title: "ккал/см²",
        values: {
          40: { color: "#fddede" },
          45: { color: "#feb7b9" },
          50: { color: "#fd9793" },
          55: { color: "#fd906c" },
          60: { color: "#f57a4e" },
          65: { color: "#e75338" },
          70: { color: "#cf2b1c" },
        },
      },
    ],
    copyright: [],
  },
  {
    id: "armenianSolarRadiationLevelLayerSource",
    path: "/solar_radiation_level.json",
    type: "geojson",
    projection: "EPSG:28408",
    card: {
      blocks: [
        {
          type: "value",
          id: "Sun_radiat",
        },
      ],
    },
    properties: [
      {
        id: "Sun_radiat",
        title: "ккал/см²",
        values: {
          115: {
            color: "#ffffb2",
          },
          120: {
            color: "#ffeb90",
          },
          125: {
            color: "#ffd76d",
          },
          130: {
            color: "#fec055",
          },
          135: {
            color: "#fea649",
          },
          140: {
            color: "#fd8d3c",
          },
          145: {
            color: "#f86c30",
          },
          150: {
            color: "#f34b25",
          },
          155: {
            color: "#e62f21",
          },
          160: {
            color: "#d21723",
          },
          165: {
            color: "#bd0026",
          },
        },
      },
    ],
    copyright: [],
  },
  {
    id: "armenianClimateZonesLayerSource",
    path: "/climate_zones.json",
    type: "geojson",
    projection: "EPSG:32638",
    card: {
      blocks: [
        {
          type: "value",
          id: "Descriptio",
        },
        {
          type: "value",
          id: "Shape_Area",
        },
      ],
    },
    properties: [
      {
        id: "Descriptio",
        title: "Описание зоны",
        values: {
          "Arid continental, with dry warm summersand moderate cold winters": {
            title:
              "Arid continental, with dry warm summersand moderate cold winters",
            color: "#d7191c",
          },
          "Moderate, warm arid summers and moderate cold winters": {
            title: "Moderate, warm arid summers and moderate cold winters",
            color: "#ffffff", // TODO, check in legend (source)
          },
          "Arid subtropical, with hot summers and calm winters": {
            title: "Arid subtropical, with hot summers and calm winters",
            color: "#e75437",
          },
          "Arid, continental, with hot summers and cold winters": {
            title: "Arid, continental, with hot summers and cold winters",
            color: "#f69053",
          },
          "Moderate, relatively dry warm summers and cold winters": {
            title: "Moderate, relatively dry warm summers and cold winters",
            color: "#febe4e",
          },
          "Moderate, relativly humid during all seasons": {
            title: "Moderate, relativly humid during all seasons",
            color: "#ffdf29",
          },
          "Moderate, with short cool summers and cold winters": {
            title: "Moderate, with short cool summers and cold winters",
            color: "#dcf02d",
          },
          "Moderate, with warm summers, relatively humid calm winters": {
            title: "Moderate, with warm summers, relatively humid calm winters",
            color: "#b8e156",
          },
          "Mountain tundra climate": {
            title: "Mountain tundra climate",
            color: "#8acc62",
          },
          "Warm summers and relatively calm winters": {
            title: "Warm summers and relatively calm winters",
            color: "#52b151",
          },
        },
      },
      {
        id: "Shape_Area",
        title: "Площадь, м²",
      },
    ],
    copyright: [],
  },
  {
    id: "armenianTemperatureLayerSource",
    path: "/temperature.json",
    type: "geojson",
    projection: "EPSG:32638",
    card: {
      blocks: [
        {
          type: "value",
          id: "Temperatur",
        },
        {
          type: "value",
          id: "Area",
        },
      ],
    },
    properties: [
      {
        id: "Temperatur",
        title: "Среднегодовая температура, °C",
        values: {
          "-5": {
            color: "#fff5f0",
          },
          "-3": {
            color: "#ffe5d9",
          },
          "-1": {
            color: "#fdccb8",
          },
          "1": {
            color: "#fcaf93",
          },
          "3": {
            color: "#fc8f6f",
          },
          "5": {
            color: "#fc7050",
          },
          "7": {
            color: "#f44d37",
          },
          "9": {
            color: "#e22d26",
          },
          "11": {
            color: "#c5161b",
          },
          "13": {
            color: "#a50f15",
          },
          "15": {
            color: "#67000d",
          },
        },
      },
      {
        id: "Area",
        title: "Площадь, м²",
      },
    ],
    copyright: [],
  },
  {
    id: "armenianPrecipitationsLevelLayerSource",
    path: "/precipitations_level.json",
    type: "geojson",
    projection: "EPSG:28408",
    card: {
      blocks: [
        {
          type: "value",
          id: "Precipitat",
        },
        {
          type: "value",
          id: "Area",
        },
      ],
    },
    properties: [
      {
        id: "Precipitat",
        title: "Среднегодовой уровень осадков, мм/год",
        values: {
          200: {
            color: "#8bc5ff",
          },
          300: {
            color: "#7ab2eb",
          },
          400: {
            color: "#6a9ed6",
          },
          500: {
            color: "#598bc1",
          },
          600: {
            color: "#4977ad",
          },
          700: {
            color: "#386498",
          },
          800: {
            color: "#275083",
          },
          900: {
            color: "#173d6f",
          },
          1000: {
            color: "#06295a",
          },
        },
      },
      {
        id: "Area",
        title: "Площадь, м²",
      },
    ],
    copyright: [],
  },
  {
    id: "armenianWindResourcesLayerSource",
    path: "/wind_resources.json",
    type: "geojson",
    projection: "EPSG:32638",
    card: {
      blocks: [
        {
          type: "tag",
          id: "Utility",
        },
        {
          type: "value",
          id: "Wind_Speed",
        },
        {
          type: "value",
          id: "Wind_Power",
        },
      ],
    },
    properties: [
      {
        id: "Utility",
        title: "Ресурсы",
        values: {
          Poor: {
            color: "#77a1ae",
          },
          Marginal: {
            color: "#ee6b75",
          },
          Good: {
            color: "#d89600",
          },
          Excellent: {
            color: "#00bb83",
          },
        },
      },
      {
        id: "Wind_Speed",
        title: "Скорость ветра, м/сек",
        values: {
          "0 - 6.0": {
            title: "0 - 6.0",
            color: "rgba(255, 255, 255, .2)",
          },
          "6.0 - 6.8": {
            title: "6.0 - 6.8",
            color: "#feaf77",
          },
          "7.5 - 8.1": {
            title: "7.5 - 8.1",
            color: "#f1605d",
          },
          "8.1 - 8.6": {
            title: "8.1 - 8.6",
            color: "#b63679",
          },
          "8.6 - 9.5": {
            title: "8.6 - 9.5",
            color: "#721f81",
          },
          ">9.5": {
            title: ">9.5",
            color: "#2d115f",
          },
        },
      },
      {
        id: "Wind_Power",
        title: "Сила ветра, км/ч",
      },
    ],
    copyright: [],
  },
  {
    id: "armenianLakesAndReservoirsSource",
    path: "/lakes_and_reservoirs.json",
    type: "geojson",
    projection: "EPSG:32638",
    card: {
      title: "Name_eng",
      blocks: [
        {
          type: "value",
          id: "BMO",
        },
        {
          type: "value",
          id: "CAcode",
        },
        {
          type: "value",
          id: "RScode",
        },
        {
          type: "value",
          id: "LKcode",
        },
        {
          type: "value",
          id: "Shape_Area",
        },
      ],
    },
    properties: [
      {
        id: "BMO",
        title: "Организация по управлению бассейном",
      },
      {
        id: "CAcode",
        title: "CAcode",
      },
      {
        id: "RScode",
        title: "RScode",
      },
      {
        id: "LKcode",
        title: "LKcode",
      },
      {
        id: "Shape_Area",
        title: "Площадь, м²",
      },
    ],
    copyright: [],
  },
  {
    id: "armenianGroundwaterZonesLayerSource",
    path: "/groundwater_zones.json",
    type: "geojson",
    projection: "EPSG:28408",
    card: {
      title: "Descript",
      blocks: [],
    },
    properties: [
      {
        id: "Descript",
        title: "Зоны подземных вод",
        values: {
          "Fault zones": {
            title: "Fault zones",
            color: "#e31a1c",
          },
          "Unconfined groundwater of continental salinity": {
            title: "Unconfined groundwater of continental salinity",
            color: "#ffab57",
          },
          "Deep faults zones with discharge of mineral water": {
            title: "Deep faults zones with discharge of mineral water",
            color: "#db1e2a",
          },
          "Tectonic faults zones with discharge of freshwater": {
            title: "Tectonic faults zones with discharge of freshwater",
            color: "#db1e2a",
          },
          "High capcity interlava and underlava water streams": {
            title: "High capcity interlava and underlava water streams",
            color: "#5e5e5e",
          },
          "Boundaries with aquifers with negative pressure": {
            title: "Boundaries with aquifers with negative pressure",
            color: "#1c8e1a",
          },
          "Boundaries with aquifers with positive pressure": {
            title: "Boundaries with aquifers with positive pressure",
            color: "#0524bc",
          },
        },
      },
    ],
    copyright: [],
  },
  {
    id: "armenianMineralAndFreshwaterResourcesLayerSource",
    path: "/mineral_and_freshwater_resources.json",
    type: "geojson",
    card: {
      blocks: [
        { type: "value", id: "Composit" },
        { type: "value", id: "Flow_l_sec" },
      ],
    },
    projection: "EPSG:28408",
    copyright: [],
    properties: [
      {
        id: "Flow_l_sec",
        title: "Скорость потока, л/сек",
        values: {
          "<25": {
            color: "#d1e3f3",
          },
          "25-50": {
            color: "#9ac8e1",
          },
          "50-100": {
            color: "#529dcc",
          },
          "100-1000": {
            color: "#1c6cb1",
          },
          ">1000": {
            color: "#08306b",
          },
        },
      },
      {
        id: "Composit",
        title: "Тип источника",
      },
    ],
  },
  {
    id: "armenianRiversLayerSource",
    path: "/rivers.json",
    type: "geojson",
    projection: "EPSG:32638",
    card: {
      title: "Name",
      blocks: [{ type: "value", id: "Shape_Leng" }],
    },
    properties: [
      {
        id: "Shape_Leng",
        title: "Длина, м",
      },
    ],
    copyright: [],
  },
];

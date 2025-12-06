import type { MainCategory } from './types';

// Placeholder image to ensure UI looks good
const PLACEHOLDER_IMG = "https://picsum.photos/200/200";

export const RAW_CATEGORIES: MainCategory[] = [
    {
      id: 800,
      name: "Clothing",
      genders: [
        {
          name: "Men",
          products: [
            {
              id: 801,
              name: "Pants",
              image: "/men/mpants1.png",
              subitems: [
                { id: 1001, name: "Pants1", price: 1499, image: "/men/mpants1.png" },
                { id: 1002, name: "Pants2", price: 1499, image: "/men/mpants2.png" },
                { id: 1003, name: "Pants3", price: 1499, image: "/men/mpants3.png" },
                { id: 1004, name: "Pants4", price: 1000, image: "/men/mpants4.png" },
                { id: 1005, name: "Pants5", price: 800, image: "/men/mpants5.png" },
                { id: 1006, name: "Pants6", price: 800, image: "/men/mpants6.png" },
                { id: 1007, name: "Pants7", price: 700, image: "/men/mpants7.png" },
                { id: 1008, name: "Pants8", price: 499, image: "/men/mpants8.png" },
                { id: 1009, name: "Pants9", price: 499, image: "/men/mpants9.png" },
                { id: 1010, name: "Pants10", price: 499, image: "/men/mpants10.png" },
                { id: 1011, name: "Pants11", price: 499, image: "/men/mpants11.png" },
                { id: 1012, name: "Pants12", price: 499, image: "/men/mpants12.png" }
              ]
            },

            {
              id: 802,
              name: "Shorts",
              image: "/men/mshorts1.png",
              subitems: [
                { id: 1013, name: "Shorts1", price: 499, image: "/men/mshorts1.png" },
                { id: 1014, name: "Shorts2", price: 499, image: "/men/mshorts2.png" },
                { id: 1015, name: "Shorts3", price: 499, image: "/men/mshorts3.png" },
                { id: 1016, name: "Shorts4", price: 499, image: "/men/mshorts4.png" },
                { id: 1017, name: "Shorts5", price: 499, image: "/men/mshorts5.png" },
                { id: 1018, name: "Shorts6", price: 499, image: "/men/mshorts6.png" },
                { id: 1019, name: "Shorts7", price: 499, image: "/men/mshorts7.png" },
                { id: 1020, name: "Shorts8", price: 499, image: "/men/mshorts8.png" },
                { id: 1021, name: "Shorts9", price: 499, image: "/men/mshorts9.png" },
                { id: 1022, name: "Shorts10", price: 499, image: "/men/mshorts10.png" },
                { id: 1023, name: "Shorts11", price: 499, image: "/men/mshorts11.png" },
                { id: 1024, name: "Shorts12", price: 499, image: "/men/mshorts12.png" }
              ]
            },

            {
              id: 803,
              name: "Shirts",
              image: "/men/mshirts1.png",
              subitems: [
                { id: 1025, name: "Shirts1", price: 499, image: "/men/mshirts1.png" },
                { id: 1026, name: "Shirts2", price: 499, image: "/men/mshirts2.png" },
                { id: 1027, name: "Shirts3", price: 499, image: "/men/mshirts3.png" },
                { id: 1028, name: "Shirts4", price: 499, image: "/men/mshirts4.png" },
                { id: 1029, name: "Shirts5", price: 499, image: "/men/mshirts5.png" },
                { id: 1030, name: "Shirts6", price: 499, image: "/men/mshirts6.png" },
                { id: 1031, name: "Shirts7", price: 499, image: "/men/mshirts7.png" },
                { id: 1032, name: "Shirts8", price: 499, image: "/men/mshirts8.png" },
                { id: 1033, name: "Shirts9", price: 499, image: "/men/mshirts9.png" },
                { id: 1034, name: "Shirts10", price: 499, image: "/men/mshirts10.png" },
                { id: 1035, name: "Shirts11", price: 499, image: "/men/mshirts11.png" },
                { id: 1036, name: "Shirts12", price: 499, image: "/men/mshirts12.png" }
              ]
            },

            {
              id: 804,
              name: "Formal Wear",
              image: "/men/mformal1.png",
              subitems: [
                { id: 1037, name: "Formal Wear1", price: 499, image: "/men/mformal1.png" },
                { id: 1038, name: "Formal Wear2", price: 499, image: "/men/mformal2.png" },
                { id: 1039, name: "Formal Wear3", price: 499, image: "/men/mformal3.png" },
                { id: 1040, name: "Formal Wear4", price: 499, image: "/men/mformal4.png" },
                { id: 1041, name: "Formal Wear5", price: 499, image: "/men/mformal5.png" },
                { id: 1042, name: "Formal Wear6", price: 499, image: "/men/mformal6.png" },
                { id: 1043, name: "Formal Wear7", price: 499, image: "/men/mformal7.png" },
                { id: 1044, name: "Formal Wear8", price: 499, image: "/men/mformal8.png" },
                { id: 1045, name: "Formal Wear9", price: 499, image: "/men/mformal9.png" },
                { id: 1046, name: "Formal Wear10", price: 499, image: "/men/mformal10.png" },
                { id: 1047, name: "Formal Wear11", price: 499, image: "/men/mformal11.png" },
                { id: 1048, name: "Formal Wear12", price: 499, image: "/men/mformal12.png" }
              ]
            },

            {
              id: 805,
              name: "Jackets",
              image: "/men/mjacket1.png",
              subitems: [
                { id: 1049, name: "Jackets1", price: 799, image: "/men/mjacket1.png" },
                { id: 1050, name: "Jackets2", price: 799, image: "/men/mjacket2.png" },
                { id: 1051, name: "Jackets3", price: 799, image: "/men/mjacket3.png" },
                { id: 1052, name: "Jackets4", price: 799, image: "/men/mjacket4.png" },
                { id: 1053, name: "Jackets5", price: 799, image: "/men/mjacket5.png" },
                { id: 1054, name: "Jackets6", price: 799, image: "/men/mjacket6.png" },
                { id: 1055, name: "Jackets7", price: 799, image: "/men/mjacket7.png" },
                { id: 1056, name: "Jackets8", price: 799, image: "/men/mjacket8.png" },
                { id: 1057, name: "Jackets9", price: 799, image: "/men/mjacket9.png" },
                { id: 1058, name: "Jackets10", price: 799, image: "/men/mjacket10.png" },
                { id: 1059, name: "Jackets11", price: 799, image: "/men/mjacket11.png" },
                { id: 1060, name: "Jackets12", price: 799, image: "/men/mjacket12.png" }
              ]
            },

            {
              id: 806,
              name: "Polo Shirts",
              image: "/men/mpolo1.png",
              subitems: [
                { id: 1061, name: "Polo Shirts1", price: 799, image: "/men/mpolo1.png" },
                { id: 1062, name: "Polo Shirts2", price: 799, image: "/men/mpolo2.png" },
                { id: 1063, name: "Polo Shirts3", price: 799, image: "/men/mpolo3.png" },
                { id: 1064, name: "Polo Shirts4", price: 799, image: "/men/mpolo4.png" },
                { id: 1065, name: "Polo Shirts5", price: 799, image: "/men/mpolo5.png" },
                { id: 1066, name: "Polo Shirts6", price: 799, image: "/men/mpolo6.png" },
                { id: 1067, name: "Polo Shirts7", price: 799, image: "/men/mpolo7.png" },
                { id: 1068, name: "Polo Shirts8", price: 799, image: "/men/mpolo8.png" },
                { id: 1069, name: "Polo Shirts9", price: 799, image: "/men/mpolo9.png" },
                { id: 1070, name: "Polo Shirts10", price: 799, image: "/men/mpolo10.png" },
                { id: 1071, name: "Polo Shirts11", price: 799, image: "/men/mpolo11.png" },
                { id: 1072, name: "Polo Shirts12", price: 799, image: "/men/mpolo12.png" }
              ]
            },
          ]
        },

        {
          name: "Women",
          products: [
            {
              id: 807,
              name: "Tops",
              image: "/women/wtops1.png",
              subitems: [
                { id: 1073, name: "Tops1", price: 799, image: "/women/wtops1.png" },
                { id: 1074, name: "Tops2", price: 799, image: "/women/wtops2.png" },
                { id: 1075, name: "Tops3", price: 799, image: "/women/wtops3.png" },
                { id: 1076, name: "Tops4", price: 799, image: "/women/wtops4.png" },
                { id: 1077, name: "Tops5", price: 799, image: "/women/wtops5.png" },
                { id: 1078, name: "Tops6", price: 799, image: "/women/wtops6.png" },
                { id: 1079, name: "Tops7", price: 799, image: "/women/wtops7.png" },
                { id: 1080, name: "Tops8", price: 799, image: "/women/wtops8.png" },
                { id: 1081, name: "Tops9", price: 799, image: "/women/wtops9.png" },
                { id: 1082, name: "Tops10", price: 799, image: "/women/wtops10.png" },
                { id: 1083, name: "Tops11", price: 799, image: "/women/wtops11.png" },
                { id: 1084, name: "Tops12", price: 799, image: "/women/wtops12.png" }
              ]
            },

            {
              id: 808,
              name: "Dress",
              image: "/women/wdress1.png",
              subitems: [
                { id: 1085, name: "Dress1", price: 799, image: "/women/wdress1.png" },
                { id: 1086, name: "Dress2", price: 799, image: "/women/wdress2.png" },
                { id: 1087, name: "Dress3", price: 799, image: "/women/wdress3.png" },
                { id: 1088, name: "Dress4", price: 799, image: "/women/wdress4.png" },
                { id: 1089, name: "Dress5", price: 799, image: "/women/wdress5.png" },
                { id: 1090, name: "Dress6", price: 799, image: "/women/wdress6.png" },
                { id: 1091, name: "Dress7", price: 799, image: "/women/wdress7.png" },
                { id: 1092, name: "Dress8", price: 799, image: "/women/wdress8.png" },
                { id: 1093, name: "Dress9", price: 799, image: "/women/wdress9.png" },
                { id: 1094, name: "Dress10", price: 799, image: "/women/wdress10.png" },
                { id: 1095, name: "Dress11", price: 799, image: "/women/wdress11.png" },
                { id: 1096, name: "Dress12", price: 799, image: "/women/wdress12.png" }
              ]
            },

            {
              id: 809,
              name: "Skirts",
              image: "/women/wskirts1.png",
              subitems: [
                { id: 1097, name: "Skirts1", price: 799, image: "/women/wskirts1.png" },
                { id: 1098, name: "Skirts2", price: 799, image: "/women/wskirts2.png" },
                { id: 1099, name: "Skirts3", price: 799, image: "/women/wskirts3.png" },
                { id: 1100, name: "Skirts4", price: 799, image: "/women/wskirts4.png" },
                { id: 1101, name: "Skirts5", price: 799, image: "/women/wskirts5.png" },
                { id: 1102, name: "Skirts6", price: 799, image: "/women/wskirts6.png" },
                { id: 1103, name: "Skirts7", price: 799, image: "/women/wskirts7.png" },
                { id: 1104, name: "Skirts8", price: 799, image: "/women/wskirts8.png" },
                { id: 1105, name: "Skirts9", price: 799, image: "/women/wskirts9.png" },
                { id: 1106, name: "Skirts10", price: 799, image: "/women/wskirts10.png" },
                { id: 1107, name: "Skirts11", price: 799, image: "/women/wskirts11.png" },
                { id: 1108, name: "Skirts12", price: 799, image: "/women/wskirts12.png" }
              ]
            },

            {
              id: 810,
              name: "Pants",
              image: "/women/wpants1.png",
              subitems: [
                { id: 1109, name: "Denim Jeans", price: 799, image: "/women/wpants1.png" },
                { id: 1110, name: "Denim Jeans", price: 799, image: "/women/wpants2.png" },
                { id: 1111, name: "Denim Jeans", price: 799, image: "/women/wpants3.png" },
                { id: 1112, name: "Denim Jeans", price: 799, image: "/women/wpants4.png" },
                { id: 1113, name: "Denim Jeans", price: 799, image: "/women/wpants5.png" },
                { id: 1114, name: "Denim Jeans", price: 799, image: "/women/wpants6.png" },
                { id: 1115, name: "Denim Jeans", price: 799, image: "/women/wpants7.png" },
                { id: 1116, name: "Denim Jeans", price: 799, image: "/women/wpants8.png" },
                { id: 1117, name: "Denim Jeans", price: 799, image: "/women/wpants9.png" },
                { id: 1118, name: "Denim Jeans", price: 799, image: "/women/wpants10.png" },
                { id: 1119, name: "Denim Jeans", price: 799, image: "/women/wpants11.png" },
                { id: 1120, name: "Denim Jeans", price: 799, image: "/women/wpants12.png" }
              ]
            },
          ]
        },

        {
          name: "Kids",
          products: [],
          children: [
            {
              name: "Boys",
              products: [
                {
                  id: 811,
                  name: "Pants",
                  image: "/kids/boys/bpants1.png",
                  subitems: [
                    { id: 1121, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants1.png" },
                    { id: 1122, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants2.png" },
                    { id: 1123, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants3.png" },
                    { id: 1124, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants4.png" },
                    { id: 1125, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants5.png" },
                    { id: 1126, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants6.png" },
                    { id: 1127, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants7.png" },
                    { id: 1128, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants8.png" },
                    { id: 1129, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants9.png" },
                    { id: 1130, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants10.png" },
                    { id: 1131, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants11.png" },
                    { id: 1132, name: "Denim Jeans", price: 799, image: "/kids/boys/bpants12.png" }
                  ]
                },

                {
                  id: 812,
                  name: "Shorts",
                  image: "/bshorts1.png",
                  subitems: [
                    { id: 1133, name: "Denim Jeans", price: 799, image: "/bshorts1.png" },
                    { id: 1134, name: "Denim Jeans", price: 799, image: "/bshorts1.png" },
                    { id: 1135, name: "Denim Jeans", price: 799, image: "/bshorts1.png" },
                    { id: 1136, name: "Denim Jeans", price: 799, image: "/bshorts1.png" },
                    { id: 1137, name: "Denim Jeans", price: 799, image: "/bshorts1.png" },
                    { id: 1138, name: "Denim Jeans", price: 799, image: "/bshorts1.png" },
                    { id: 1139, name: "Denim Jeans", price: 799, image: "/bshorts1.png" },
                    { id: 1140, name: "Denim Jeans", price: 799, image: "/bshorts1.png" },
                    { id: 1141, name: "Denim Jeans", price: 799, image: "/bshorts1.png" },
                    { id: 1142, name: "Denim Jeans", price: 799, image: "/bshorts1.png" },
                    { id: 1143, name: "Denim Jeans", price: 799, image: "/bshorts1.png" },
                    { id: 1144, name: "Denim Jeans", price: 799, image: "/bshorts1.png" }
                  ]
                },

                {
                  id: 813,
                  name: "Shirt",
                  image: "/bshirts1.png",
                  subitems: [
                    { id: 1145, name: "Denim Jeans", price: 799, image: "/jacket1.png" },
                    { id: 1146, name: "Denim Jeans", price: 799, image: "/jacket1.png" },
                    { id: 1147, name: "Denim Jeans", price: 799, image: "/jacket1.png" },
                    { id: 1148, name: "Denim Jeans", price: 799, image: "/jacket1.png" },
                    { id: 1149, name: "Denim Jeans", price: 799, image: "/jacket1.png" },
                    { id: 1150, name: "Denim Jeans", price: 799, image: "/jacket1.png" },
                    { id: 1151, name: "Denim Jeans", price: 799, image: "/jacket1.png" },
                    { id: 1152, name: "Denim Jeans", price: 799, image: "/jacket1.png" },
                    { id: 1153, name: "Denim Jeans", price: 799, image: "/jacket1.png" },
                    { id: 1154, name: "Denim Jeans", price: 799, image: "/jacket1.png" },
                    { id: 1155, name: "Denim Jeans", price: 799, image: "/jacket1.png" },
                    { id: 1156, name: "Denim Jeans", price: 799, image: "/jacket1.png" }
                  ]
                },

                {
                  id: 814,
                  name: "Jackets",
                  image: "/bjackets1.png",
                  subitems: [
                    { id: 1157, name: "Blue T-Shirt", price: 250, image: "/boys2.png" },
                    { id: 1158, name: "Blue T-Shirt", price: 250, image: "/boys2.png" },
                    { id: 1159, name: "Blue T-Shirt", price: 250, image: "/boys2.png" },
                    { id: 1160, name: "Blue T-Shirt", price: 250, image: "/boys2.png" },
                    { id: 1161, name: "Blue T-Shirt", price: 250, image: "/boys2.png" },
                    { id: 1162, name: "Blue T-Shirt", price: 250, image: "/boys2.png" },
                    { id: 1163, name: "Blue T-Shirt", price: 250, image: "/boys2.png" },
                    { id: 1164, name: "Blue T-Shirt", price: 250, image: "/boys2.png" },
                    { id: 1165, name: "Blue T-Shirt", price: 250, image: "/boys2.png" },
                    { id: 1166, name: "Blue T-Shirt", price: 250, image: "/boys2.png" },
                    { id: 1167, name: "Blue T-Shirt", price: 250, image: "/boys2.png" },
                    { id: 1168, name: "Blue T-Shirt", price: 250, image: "/boys2.png" }
                  ],
                },

                {
                  id: 853,
                  name: "Polo",
                  image: "/boys/bpolo1.png",
                  subitems: [
                    { id: 1600, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo1.png" },
                    { id: 1601, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo2.png" },
                    { id: 1602, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo3.png" },
                    { id: 1603, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo4.png" },
                    { id: 1604, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo5.png" },
                    { id: 1605, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo6.png" },
                    { id: 1606, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo7.png" },
                    { id: 1607, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo8.png" },
                    { id: 1608, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo9.png" },
                    { id: 1609, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo10.png" },
                    { id: 1610, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo11.png" },
                    { id: 1611, name: "Blue T-Shirt", price: 250, image: "/boys/bpolo12.png" }
                  ],
                }
              ]
            },
            {
              name: "Girls",
              products: [
                {
                  id: 815,
                  name: "Tops",
                  image: "/gtops1.png",
                  subitems: [
                    { id: 1168, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1169, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1170, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1171, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1172, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1173, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1174, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1175, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1176, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1177, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1178, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1179, name: "Pink Dress", price: 550, image: "/girls1.png" }
                  ]
                },

                {
                  id: 816,
                  name: "Dress",
                  image: "/kids/girls/gdress1.png",
                  subitems: [
                    { id: 1180, name: "Pink Dress", price: 550, image: "/kids/girls/gdress1.png" },
                    { id: 1181, name: "Pink Dress", price: 550, image: "/kids/girls/gdress2.png" },
                    { id: 1182, name: "Pink Dress", price: 550, image: "/kids/girls/gdress3.png" },
                    { id: 1183, name: "Pink Dress", price: 550, image: "/kids/girls/gdress4.png" },
                    { id: 1184, name: "Pink Dress", price: 550, image: "/kids/girls/gdress5.png" },
                    { id: 1185, name: "Pink Dress", price: 550, image: "/kids/girls/gdress6.png" },
                    { id: 1186, name: "Pink Dress", price: 550, image: "/kids/girls/gdress7.png" },
                    { id: 1187, name: "Pink Dress", price: 550, image: "/kids/girls/gdress8.png" },
                    { id: 1188, name: "Pink Dress", price: 550, image: "/kids/girls/gdress9.png" },
                    { id: 1189, name: "Pink Dress", price: 550, image: "/kids/girls/gdress10.png" },
                    { id: 1190, name: "Pink Dress", price: 550, image: "/kids/girls/gdress11.png" },
                    { id: 1191, name: "Pink Dress", price: 550, image: "/kids/girls/gdress12.png" }
                  ]
                },

                {
                  id: 817,
                  name: "Skirts",
                  image: "/girls/gskirts1.png",
                  subitems: [
                    { id: 1192, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1193, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1194, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1195, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1196, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1197, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1198, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1199, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1200, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1201, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1202, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1203, name: "Pink Dress", price: 550, image: "/girls1.png" }
                  ]
                },

                {
                  id: 818,
                  name: "Pants",
                  image: "/gpants1.png",
                  subitems: [
                    { id: 1204, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1205, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1206, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1207, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1208, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1209, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1210, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1211, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1212, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1213, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1214, name: "Pink Dress", price: 550, image: "/girls1.png" },
                    { id: 1215, name: "Pink Dress", price: 550, image: "/girls1.png" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    {
      id: 819,
      name: "Footwear",
      genders: [
        {
          name: "Men",
          products: [
            {
              id: 820,
              name: "Shoes",
              image: "/men/mshoes1.png",
              subitems: [
                { id: 1216, name: "Formal Shoes", price: 1299, image: "/men/mshoes1.png" },
                { id: 1217, name: "Formal Shoes", price: 1299, image: "/men/mshoes2.png" },
                { id: 1218, name: "Formal Shoes", price: 1299, image: "/men/mshoes3.png" },
                { id: 1219, name: "Formal Shoes", price: 1299, image: "/men/mshoes4.png" },
                { id: 1220, name: "Formal Shoes", price: 1299, image: "/men/mshoes5.png" },
                { id: 1221, name: "Formal Shoes", price: 1299, image: "/men/mshoes6.png" },
                { id: 1222, name: "Formal Shoes", price: 1299, image: "/men/mshoes7.png" },
                { id: 1223, name: "Formal Shoes", price: 1299, image: "/men/mshoes8.png" },
                { id: 1224, name: "Formal Shoes", price: 1299, image: "/men/mshoes9.png" },
                { id: 1225, name: "Formal Shoes", price: 1299, image: "/men/mshoes10.png" },
                { id: 1226, name: "Formal Shoes", price: 1299, image: "/men/mshoes11.png" },
                { id: 1227, name: "Formal Shoes", price: 1299, image: "/men/mshoes12.png" }
              ]
            },

            {
              id: 821,
              name: "Black Shoes",
              image: "/shoes1.png",
              subitems: [
                { id: 1228, name: "Formal Shoes", price: 1299, image: "/black1.png" },
                { id: 1229, name: "Formal Shoes", price: 1299, image: "/black2.png" },
                { id: 1230, name: "Formal Shoes", price: 1299, image: "/black2.png" },
                { id: 1231, name: "Formal Shoes", price: 1299, image: "/black2.png" },
                { id: 1232, name: "Formal Shoes", price: 1299, image: "/black2.png" },
                { id: 1233, name: "Formal Shoes", price: 1299, image: "/black1.png" },
                { id: 1234, name: "Formal Shoes", price: 1299, image: "/black2.png" },
                { id: 1235, name: "Formal Shoes", price: 1299, image: "/black2.png" },
                { id: 1236, name: "Formal Shoes", price: 1299, image: "/black2.png" },
                { id: 1237, name: "Formal Shoes", price: 1299, image: "/black2.png" },
                { id: 1238, name: "Formal Shoes", price: 1299, image: "/black1.png" },
                { id: 1239, name: "Formal Shoes", price: 1299, image: "/black2.png" }
              ]
            },

            {
              id: 822,
              name: "Sleepers",
              image: "/sleepers1.png",
              subitems: [
                { id: 1240, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" },
                { id: 1241, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" },
                { id: 1242, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" },
                { id: 1243, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" },
                { id: 1244, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" },
                { id: 1245, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" },
                { id: 1246, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" },
                { id: 1247, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" },
                { id: 1248, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" },
                { id: 1249, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" },
                { id: 1250, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" },
                { id: 1251, name: "Formal Shoes", price: 1299, image: "/sleepers1.png" }
              ]
            }
          ]
        },

        {
          name: "Women",
          products: [
            {
              id: 823,
              name: "Heels",
              image: "/women/wheels1.png",
              subitems: [
                    { id: 1252, name: "Red Heels", price: 899, image: "/women/wheels1.png" },
                    { id: 1253, name: "Red Heels", price: 899, image: "/women/wheels1.png" },
                    { id: 1254, name: "Red Heels", price: 899, image: "/women/wheels1.png" },
                    { id: 1255, name: "Red Heels", price: 899, image: "/women/wheels1.png" },
                    { id: 1256, name: "Red Heels", price: 899, image: "/women/wheels1.png" },
                    { id: 1257, name: "Red Heels", price: 899, image: "/women/wheels1.png" },
                    { id: 1258, name: "Red Heels", price: 899, image: "/women/wheels1.png" },
                    { id: 1259, name: "Red Heels", price: 899, image: "/women/wheels1.png" },
                    { id: 1260, name: "Red Heels", price: 899, image: "/women/wheels1.png" },
                    { id: 1261, name: "Red Heels", price: 899, image: "/women/wheels1.png" },
                    { id: 1262, name: "Red Heels", price: 899, image: "/women/wheels1.png" },
                    { id: 1263, name: "Red Heels", price: 899, image: "/women/wheels1.png" }
                  ]
                },

                {
                  id: 824,
                  name: "Sandals",
                  image: "/women/wsandals1.png",
                  subitems: [
                    { id: 1264, name: "Red Heels", price: 899, image: "/women/wsandals1.png" },
                    { id: 1265, name: "Red Heels", price: 899, image: "/women/wsandals2.png" },
                    { id: 1266, name: "Red Heels", price: 899, image: "/women/wsandals3.png" },
                    { id: 1267, name: "Red Heels", price: 899, image: "/women/wsandals4.png" },
                    { id: 1268, name: "Red Heels", price: 899, image: "/women/wsandals5.png" },
                    { id: 1269, name: "Red Heels", price: 899, image: "/women/wsandals6.png" },
                    { id: 1270, name: "Red Heels", price: 899, image: "/women/wsandals7.png" },
                    { id: 1271, name: "Red Heels", price: 899, image: "/women/wsandals8.png" },
                    { id: 1272, name: "Red Heels", price: 899, image: "/women/wsandals9.png" },
                    { id: 1273, name: "Red Heels", price: 899, image: "/women/wsandals10.png" },
                    { id: 1274, name: "Red Heels", price: 899, image: "/women/wsandals11.png" },
                    { id: 1275, name: "Red Heels", price: 899, image: "/women/wsandals12.png" }
                  ]
                },

                {
                  id: 825,
                  name: "Boots",
                  image: "/women/wboots1.png",
                  subitems: [
                    { id: 1276, name: "Red Heels", price: 899, image: "/women/wboots1.png" },
                    { id: 1277, name: "Red Heels", price: 899, image: "/women/wboots2.png" },
                    { id: 1278, name: "Red Heels", price: 899, image: "/women/wboots3.png" },
                    { id: 1279, name: "Red Heels", price: 899, image: "/women/wboots4.png" },
                    { id: 1280, name: "Red Heels", price: 899, image: "/women/wboots5.png" },
                    { id: 1281, name: "Red Heels", price: 899, image: "/women/wboots6.png" },
                    { id: 1282, name: "Red Heels", price: 899, image: "/women/wboots7.png" },
                    { id: 1283, name: "Red Heels", price: 899, image: "/women/wboots8.png" },
                    { id: 1284, name: "Red Heels", price: 899, image: "/women/wboots9.png" },
                    { id: 1285, name: "Red Heels", price: 899, image: "/women/wboots10.png" },
                    { id: 1286, name: "Red Heels", price: 899, image: "/women/wboots11.png" },
                    { id: 1287, name: "Red Heels", price: 899, image: "/women/wboots12.png" }
                  ]
                },

                {
                  id: 826,
                  name: "Shoes",
                  image: "/wshoes1.png",
                  subitems: [
                    { id: 1288, name: "Red Heels", price: 899, image: "/wshoes1.png" },
                    { id: 1289, name: "Red Heels", price: 899, image: "/wshoes2.png" },
                    { id: 1290, name: "Red Heels", price: 899, image: "/wshoes3.png" },
                    { id: 1291, name: "Red Heels", price: 899, image: "/wshoes4.png" },
                    { id: 1292, name: "Red Heels", price: 899, image: "/wshoes5.png" },
                    { id: 1293, name: "Red Heels", price: 899, image: "/wshoes6.png" },
                    { id: 1294, name: "Red Heels", price: 899, image: "/wshoes7.png" },
                    { id: 1295, name: "Red Heels", price: 899, image: "/wshoes8.png" },
                    { id: 1296, name: "Red Heels", price: 899, image: "/wshoes9.png" },
                    { id: 1297, name: "Red Heels", price: 899, image: "/wshoes10.png" },
                    { id: 1298, name: "Red Heels", price: 899, image: "/wshoes11.png" },
                    { id: 1299, name: "Red Heels", price: 899, image: "/wshoes12.png" }
                  ]
                },

                {
                  id: 827,
                  name: "Sleepers",
                  image: "/wsleepers1.png",
                  subitems: [
                    { id: 1300, name: "Red Heels", price: 899, image: "/wsleepers.png" },
                    { id: 1301, name: "Red Heels", price: 899, image: "/wsleepers.png" },
                    { id: 1302, name: "Red Heels", price: 899, image: "/wsleepers.png" },
                    { id: 1303, name: "Red Heels", price: 899, image: "/wsleepers.png" },
                    { id: 1304, name: "Red Heels", price: 899, image: "/wsleepers.png" },
                    { id: 1305, name: "Red Heels", price: 899, image: "/wsleepers.png" },
                    { id: 1306, name: "Red Heels", price: 899, image: "/wsleepers.png" },
                    { id: 1307, name: "Red Heels", price: 899, image: "/wsleepers.png" },
                    { id: 1308, name: "Red Heels", price: 899, image: "/wsleepers.png" },
                    { id: 1309, name: "Red Heels", price: 899, image: "/wsleepers.png" },
                    { id: 1310, name: "Red Heels", price: 899, image: "/wsleepers.png" },
                    { id: 1311, name: "Red Heels", price: 899, image: "/wsleepers.png" },
              ]
            }
          ]
        },
        {
          name: "Kids",
          products: [],
          children: [
            {
              name: "Boys",
              products: [
                {
                  id: 828,
                  name: "Shoes",
                  image: "/boys/bshoes1.png",
                  subitems: [
                    { id: 1312, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes1.png" },
                    { id: 1313, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes2.png" },
                    { id: 1314, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes3.png" },
                    { id: 1315, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes3.png" },
                    { id: 1316, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes3.png" },
                    { id: 1317, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes1.png" },
                    { id: 1318, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes2.png" },
                    { id: 1319, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes3.png" },
                    { id: 1320, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes3.png" },
                    { id: 1321, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes3.png" },
                    { id: 1322, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes1.png" },
                    { id: 1323, name: "Sporty Sneakers", price: 699, image: "/boys/bshoes2.png" }
                  ]
                },

                {
                  id: 829,
                  name: "Black Shoes",
                  image: "/boys/bblack1.png",
                  subitems: [
                    { id: 1324, name: "Sporty Sneakers", price: 699, image: "/boys/bblack1.png" },
                    { id: 1325, name: "Sporty Sneakers", price: 699, image: "/boys/bblack2.png" },
                    { id: 1326, name: "Sporty Sneakers", price: 699, image: "/boys/bblack3.png" },
                    { id: 1327, name: "Sporty Sneakers", price: 699, image: "/boys/bblack3.png" },
                    { id: 1328, name: "Sporty Sneakers", price: 699, image: "/boys/bblack3.png" },
                    { id: 1329, name: "Sporty Sneakers", price: 699, image: "/boys/bblack1.png" },
                    { id: 1330, name: "Sporty Sneakers", price: 699, image: "/boys/bblack2.png" },
                    { id: 1331, name: "Sporty Sneakers", price: 699, image: "/boys/bblack3.png" },
                    { id: 1332, name: "Sporty Sneakers", price: 699, image: "/boys/bblack3.png" },
                    { id: 1333, name: "Sporty Sneakers", price: 699, image: "/boys/bblack3.png" },
                    { id: 1334, name: "Sporty Sneakers", price: 699, image: "/boys/bblack1.png" },
                    { id: 1335, name: "Sporty Sneakers", price: 699, image: "/boys/bblack2.png" }
                  ]
                },

                {
                  id: 830,
                  name: "Sleepers",
                  image: "/boys/bsleepers1.png",
                  subitems: [
                    { id: 1336, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers1.png" },
                    { id: 1337, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers2.png" },
                    { id: 1338, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers3.png" },
                    { id: 1339, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers3.png" },
                    { id: 1340, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers3.png" },
                    { id: 1341, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers1.png" },
                    { id: 1342, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers2.png" },
                    { id: 1343, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers3.png" },
                    { id: 1344, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers9.png" },
                    { id: 1345, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers3.png" },
                    { id: 1346, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers1.png" },
                    { id: 1347, name: "Sporty Sneakers", price: 699, image: "/boys/bsleepers2.png" }
                  ]
                }
              ]
            },

            {
              name: "Girls",
              products: [
                {
                  id: 831,
                  name: "Heels",
                  image: "/girls/gheels1.png",
                  subitems: [
                    { id: 1348, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" },
                    { id: 1349, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" },
                    { id: 1350, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" },
                    { id: 1351, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" },
                    { id: 1352, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" },
                    { id: 1353, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" },
                    { id: 1354, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" },
                    { id: 1355, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" },
                    { id: 1356, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" },
                    { id: 1357, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" },
                    { id: 1358, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" },
                    { id: 1359, name: "Flower Sandals", price: 499, image: "/girls/gheels.png" }
                  ]
                },

                {
                  id: 832,
                  name: "Sandals",
                  image: "/girls/gsandals1.png",
                  subitems: [
                    { id: 1360, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" },
                    { id: 1361, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" },
                    { id: 1362, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" },
                    { id: 1363, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" },
                    { id: 1364, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" },
                    { id: 1365, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" },
                    { id: 1366, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" },
                    { id: 1367, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" },
                    { id: 1368, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" },
                    { id: 1369, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" },
                    { id: 1370, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" },
                    { id: 1371, name: "Flower Sandals", price: 499, image: "/girls/gsandals.png" }
                  ]
                },

                {
                  id: 833,
                  name: "Boots",
                  image: "/girls/gboots1.png",
                  subitems: [
                    { id: 1372, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" },
                    { id: 1373, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" },
                    { id: 1374, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" },
                    { id: 1375, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" },
                    { id: 1376, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" },
                    { id: 1377, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" },
                    { id: 1378, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" },
                    { id: 1379, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" },
                    { id: 1380, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" },
                    { id: 1381, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" },
                    { id: 1382, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" },
                    { id: 1383, name: "Flower Sandals", price: 499, image: "/girls/gboots.png" }
                  ]
                },

                {
                  id: 834,
                  name: "Shoes",
                  image: "/girls/gshoes1.png",
                  subitems: [
                    { id: 1384, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" },
                    { id: 1385, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" },
                    { id: 1386, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" },
                    { id: 1387, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" },
                    { id: 1388, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" },
                    { id: 1389, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" },
                    { id: 1390, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" },
                    { id: 1391, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" },
                    { id: 1392, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" },
                    { id: 1393, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" },
                    { id: 1394, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" },
                    { id: 1395, name: "Flower Sandals", price: 499, image: "/girls/gshoes.png" }
                  ]
                },

                {
                  id: 835,
                  name: "Sleepers",
                  image: "/girls/gsleepers1.png",
                  subitems: [
                    { id: 1396, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" },
                    { id: 1397, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" },
                    { id: 1398, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" },
                    { id: 1399, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" },
                    { id: 1400, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" },
                    { id: 1401, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" },
                    { id: 1402, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" },
                    { id: 1403, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" },
                    { id: 1404, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" },
                    { id: 1405, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" },
                    { id: 1406, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" },
                    { id: 1407, name: "Flower Sandals", price: 499, image: "/girls/gsleepers.png" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    {
      id: 836,
      name: "Accessories",
      genders: [
        {
          name: "Men",
          products: [
            {
              id: 837,
              name: "Necklace",
              image: "/shoes1.png",
              subitems: [
                { id: 1408, name: "Formal Shoes", price: 1299, image: "/necklace1.png" },
                { id: 1409, name: "Formal Shoes", price: 1299, image: "/necklace1.png" },
                { id: 1410, name: "Formal Shoes", price: 1299, image: "/necklace1.png" },
                { id: 1411, name: "Formal Shoes", price: 1299, image: "/necklace1.png" },
                { id: 1412, name: "Formal Shoes", price: 1299, image: "/necklace1.png" },
                { id: 1413, name: "Formal Shoes", price: 1299, image: "/necklace1.png" },
                { id: 1414, name: "Formal Shoes", price: 1299, image: "/necklace1.png" },
                { id: 1415, name: "Formal Shoes", price: 1299, image: "/necklace1.png" },
                { id: 1416, name: "Formal Shoes", price: 1299, image: "/necklace1.png" },
                { id: 1417, name: "Formal Shoes", price: 1299, image: "/necklace1.png" },
                { id: 1418, name: "Formal Shoes", price: 1299, image: "/necklace1.png" },
                { id: 1419, name: "Formal Shoes", price: 1299, image: "/necklace1.png" }
              ]
            },

            {
              id: 838,
              name: "Bracelets",
              image: "/shoes1.png",
              subitems: [
                { id: 1420, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1421, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1422, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1423, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1424, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1425, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1426, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1427, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1428, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1429, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1430, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1431, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" }
              ]
            },

            {
              id: 839,
              name: "Earings",
              image: "/shoes1.png",
              subitems: [
                { id: 1432, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1433, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1434, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1435, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1436, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1437, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1438, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1439, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1440, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1441, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1442, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1443, name: "Formal Shoes", price: 1299, image: "/earings1.png" }
              ]
            },

            {
              id: 840,
              name: "Watch",
              image: "/shoes1.png",
              subitems: [
                { id: 1444, name: "Formal Shoes", price: 1299, image: "/watch.png" },
                { id: 1445, name: "Formal Shoes", price: 1299, image: "/watch.png" },
                { id: 1446, name: "Formal Shoes", price: 1299, image: "/watch.png" },
                { id: 1447, name: "Formal Shoes", price: 1299, image: "/watch.png" },
                { id: 1448, name: "Formal Shoes", price: 1299, image: "/watch.png" },
                { id: 1449, name: "Formal Shoes", price: 1299, image: "/watch.png" },
                { id: 1450, name: "Formal Shoes", price: 1299, image: "/watch.png" },
                { id: 1451, name: "Formal Shoes", price: 1299, image: "/watch.png" },
                { id: 1452, name: "Formal Shoes", price: 1299, image: "/watch.png" },
                { id: 1453, name: "Formal Shoes", price: 1299, image: "/watch.png" },
                { id: 1454, name: "Formal Shoes", price: 1299, image: "/watch.png" },
                { id: 1455, name: "Formal Shoes", price: 1299, image: "/watch.png" }
              ]
            }
          ]
        },

        {
        name: "Women",
          products: [
            {
              id: 841,
              name: "Necklace",
              image: "/shoes1.png",
              subitems: [
                { id: 1456, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                { id: 1457, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                { id: 1458, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                { id: 1459, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                { id: 1460, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                { id: 1461, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                { id: 1462, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                { id: 1463, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                { id: 1464, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                { id: 1465, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                { id: 1466, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                { id: 1467, name: "Formal Shoes", price: 1299, image: "necklace1.png" }
              ]
            },

            {
              id: 842,
              name: "Bracelets",
              image: "/shoes1.png",
              subitems: [
                { id: 1468, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1469, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1470, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1471, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1472, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1473, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1474, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1475, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1476, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1477, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1478, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                { id: 1479, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" }
              ]
            },

            {
              id: 843,
              name: "Earings",
              image: "/shoes1.png",
              subitems: [
                { id: 1480, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1481, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1482, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1483, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1484, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1485, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1486, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1487, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1488, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1489, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1490, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                { id: 1491, name: "Formal Shoes", price: 1299, image: "/earings1.png" }
              ]
            },

            {
              id: 844,
              name: "Watch",
              image: "/shoes1.png",
              subitems: [
                { id: 1492, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                { id: 1493, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                { id: 1494, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                { id: 1495, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                { id: 1496, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                { id: 1497, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                { id: 1498, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                { id: 1499, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                { id: 1500, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                { id: 1501, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                { id: 1502, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                { id: 1503, name: "Formal Shoes", price: 1299, image: "/watch1.png" }
              ]
            }
          ]
        },

        {
          name: "Kids",
          products: [],
          children: [
            {
              name: "Boys",
              products: [
                {
                  id: 845,
                  name: "Necklace",
                  image: "/shoes1.png",
                  subitems: [
                    { id: 1504, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1505, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1506, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1507, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1508, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1509, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1510, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1511, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1512, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1513, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1514, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1515, name: "Formal Shoes", price: 1299, image: "necklace1.png" }
                  ]
                },

                {
                  id: 846,
                  name: "Bracelets",
                  image: "/shoes1.png",
                  subitems: [
                    { id: 1516, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                    { id: 1517, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                    { id: 1518, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                    { id: 1519, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                    { id: 1520, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                    { id: 1521, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                    { id: 1522, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                    { id: 1523, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                    { id: 1524, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                    { id: 1525, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                    { id: 1526, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                    { id: 1527, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" }
                  ]
                },

                {
                  id: 847,
                  name: "Earings",
                  image: "/shoes1.png",
                  subitems: [
                    { id: 1528, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1529, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1530, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1531, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1532, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1533, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1534, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1535, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1536, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1537, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1538, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1539, name: "Formal Shoes", price: 1299, image: "/earings1.png" }
                  ]
                },

                {
                  id: 848,
                  name: "Watch",
                  image: "/shoes1.png",
                  subitems: [
                    { id: 1540, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1541, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1542, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1543, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1544, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1545, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1546, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1547, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1548, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1549, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1550, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1551, name: "Formal Shoes", price: 1299, image: "/watch1.png" }
                  ]
                }
              ]
            },
            {
              name: "Girls",
              products: [
                {
                  id: 849,
                  name: "Necklace",
                  image: "/shoes1.png",
                  subitems: [
                    { id: 1552, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1553, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1554, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1555, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1556, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1557, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1558, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1559, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1560, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1561, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1562, name: "Formal Shoes", price: 1299, image: "necklace1.png" },
                    { id: 1563, name: "Formal Shoes", price: 1299, image: "necklace1.png" }
                  ]
                },

                {
                  id: 850,
                  name: "Bracelets",
                  image: "/shoes1.png",
                  subitems: [
                        { id: 1564, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                        { id: 1565, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                        { id: 1566, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                        { id: 1567, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                        { id: 1568, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                        { id: 1569, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                        { id: 1570, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                        { id: 1571, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                        { id: 1572, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                        { id: 1573, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                        { id: 1574, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" },
                        { id: 1575, name: "Formal Shoes", price: 1299, image: "/bracelets1.png" }
                      ]
                    },

                {
                  id: 851,
                  name: "Earings",
                  image: "/shoes1.png",
                  subitems: [
                    { id: 1576, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1577, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1578, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1579, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1580, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1581, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1582, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1583, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1584, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1585, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1586, name: "Formal Shoes", price: 1299, image: "/earings1.png" },
                    { id: 1587, name: "Formal Shoes", price: 1299, image: "/earings1.png" }
                  ]
                },

                {
                  id: 852,
                  name: "Watch",
                  image: "/shoes1.png",
                  subitems: [
                    { id: 1588, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1589, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1590, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1591, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1592, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1593, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1594, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1595, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1596, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1597, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1598, name: "Formal Shoes", price: 1299, image: "/watch1.png" },
                    { id: 1599, name: "Formal Shoes", price: 1299, image: "/watch1.png" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
];
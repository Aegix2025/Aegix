<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { cart } from '$lib/stores/cart';
  import { get } from 'svelte/store';
  import type { SubItem, Product, GenderCategory, MainCategory } from '$lib/types';
  import { writable } from 'svelte/store';

  let categories: MainCategory[] = [
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

  // ========== DATA VARIABLES ==========
  let dashboardData = {
    todaySales: 0,
    pendingOrders: 0,
    newCustomers: 0,
    conversionRate: 0
  };

  let reportData = {
    totalSales: 0,
    totalOrders: 0,
    productStatistic: 0,
    visitor: 0,
    totalSoldProducts: 0
  };

  let consumerData = {
    totalConsumers: 0,
    activeConsumers: 0,
    newThisMonth: 0
  };

  let transactionData = {
    totalAmount: 0,
    completedAmount: 0,
    pendingAmount: 0
  };

  let invoiceData = {
    paid: 0,
    pending: 0,
    overdue: 0
  };

  let feedbackData = {
    totalReviews: 0,
    positiveReviews: 0,
    averageRating: 0
  };

  // Profile and Settings
  let profileInfo = {
    name: "Edrian Dela Cruz",
    email: "edriandelacruz@gmail.com",
    phone: "09354817174"
  };
  
  let securitySettings = {
    twoFactorEnabled: false,
    passwordLastChanged: "2023-10-15"
  };
  
  let notificationPrefs = {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  };
  
  let storeInfo = {
    name: "My Awesome Store",
    description: "Quality products for everyone",
    contactEmail: "store@example.com"
  };
  
  let paymentMethods = [
    { id: 1, type: "Credit Card", lastFour: "4242", isDefault: true },
    { id: 2, type: "PayPal", email: "user@example.com", isDefault: false }
  ];
  
  let shippingOptions = [
    { id: 1, name: "Standard Shipping", cost: 5.99, days: "3-5" },
    { id: 2, name: "Express Shipping", cost: 12.99, days: "1-2" }
  ];
  
  let taxConfig = {
    rate: 8.5,
    enabled: true,
    country: "United States"
  };
  
  let currencySettings = {
    currency: "USD",
    symbol: "$"
  };
  
  let businessHours = {
    monday: { open: "09:00", close: "17:00", closed: false },
    tuesday: { open: "09:00", close: "17:00", closed: false },
    wednesday: { open: "09:00", close: "17:00", closed: false },
    thursday: { open: "09:00", close: "17:00", closed: false },
    friday: { open: "09:00", close: "17:00", closed: false },
    saturday: { open: "10:00", close: "14:00", closed: false },
    sunday: { open: "", close: "", closed: true }
  };

  // ========== APPLICATION STATE ==========
  let showModal = false;
  let isLoggedIn = false;
  let currentUser = '';
  let showMenu = false;
  let showUserMenu = false;
  
  let activeSection:
    | "dashboard"
    | "report"
    | "products"
    | "consumer"
    | "transactions"
    | "invoices"
    | "settings"
    | "feedback"
    | "help" = "dashboard";

  let showSubmenu = false;
  let hoveredNav: string = "";
  let activeSubmenu: string | null = "Clothing"; 

  let selectedMainCategory: MainCategory;
  let selectedGenderIndex: number = 0;
  let selectedGender: GenderCategory;
  let selectedKidsCategory: string | null = null;
  let selectedProduct: Product | null = null;
  let selectedProductName: string | null = null;

  let selectedSubitem: SubItem | null = null;
  let quantity = 1;
  let searchQuery = "";

  let cartItems: Array<{item: SubItem, quantity: number}> = [];
  let cartTotal = 0;
  let cartItemCount = 0;

  let showCheckoutModal = false;
  let showSuccessModal = false;
  let paymentMethod: "card" | "cash" | null = null;
  let cashAmount = 0;
  let changeAmount = 0;
  let transactionDetails: any = null;

  // Settings modal state
  let showSettingsModal = false;
  let settingsModalTitle = "";
  let settingsModalContent = "";
  let currentSetting = "";

  // ========== COMPUTED PROPERTIES ==========
  $: showKidsSubcategories = selectedGenderIndex === 2 && selectedGender?.children;
  $: canShowProducts = selectedGenderIndex !== 2 || (selectedGenderIndex === 2 && selectedKidsCategory);

  $: currentProducts = (() => {
    if (!selectedGender) return [];
    
    if (selectedGenderIndex === 2 && selectedKidsCategory && selectedGender.children) {
      const kidsCategory = selectedGender.children.find(child => child.name === selectedKidsCategory);
      return kidsCategory ? kidsCategory.products : [];
    } else {
      return selectedGender.products;
    }
  })();

  $: filteredSubitems = selectedProduct ? selectedProduct.subitems.filter(subitem => 
    subitem.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  $: {
    try {
      const storeCart = get(cart);
      if (Array.isArray(storeCart)) {
        cartItems = storeCart;
      }
    } catch (error) {
      console.warn('Cart store not available, using local state');
    }
    
    cartTotal = cartItems.reduce((total, item) => total + (item.item.price * item.quantity), 0);
    cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // ========== AUTH FUNCTIONS ==========
  function register() {
    if (!isLoggedIn) {
      showModal = true;
    }
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    
    const loginUsername = document.getElementById('login-username') as HTMLInputElement;
    const loginPassword = document.getElementById('login-password') as HTMLInputElement;
    
    if (loginUsername && loginPassword) {
      if (loginUsername.value.trim() && loginPassword.value.trim()) {
        currentUser = loginUsername.value;
        isLoggedIn = true;
        showModal = false;
        
        localStorage.setItem('currentUser', currentUser);
        localStorage.setItem('isLoggedIn', 'true');
        
        const authForm = document.getElementById('auth-form') as HTMLFormElement;
        if (authForm) {
          authForm.reset();
        }
      }
    }
  }

  function handleUsernameInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.value.length >= 6) {
      input.value = input.value.slice(0, 6);
    }
  }

  function logout() {
    isLoggedIn = false;
    currentUser = '';
    showModal = false;
    
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    
    cartItems = [];
    try {
      cart.set([]);
    } catch (error) {
      console.warn('Could not clear cart store');
    }
  }

  function handleOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).id === 'modal-overlay') {
      showModal = false;
    }
  }

  // ========== PRODUCTS AND CART FUNCTIONS ==========
  function isSubitemInCart(subitem: SubItem): boolean {
    try {
      return cartItems.some(c => c.item.id === subitem.id);
    } catch (error) {
      console.error('Error checking cart:', error);
      return false;
    }
  }

  function toggleSubitemInCart(subitem: SubItem) {
    const existingIndex = cartItems.findIndex(c => c.item.id === subitem.id);
    
    if (existingIndex > -1) {
      cartItems = cartItems.filter(c => c.item.id !== subitem.id);
    } else {
      cartItems = [...cartItems, { 
        item: subitem, 
        quantity: 1 
      }];
    }
    
    try {
      cart.set(cartItems);
    } catch (error) {
      console.warn('Could not update cart store, using local state only');
    }
  }

  function increaseQuantity(itemId: number) {
    cartItems = cartItems.map(c =>
      c.item.id === itemId ? { ...c, quantity: c.quantity + 1 } : c
    );
    
    try {
      cart.set(cartItems);
    } catch (error) {
      console.warn('Could not update cart store, using local state only');
    }
  }

  function decreaseQuantity(itemId: number) {
    const itemIndex = cartItems.findIndex(c => c.item.id === itemId);
    
    if (itemIndex > -1) {
        const currentItem = cartItems[itemIndex];
        
        if (currentItem.quantity > 1) {
            cartItems[itemIndex] = {
                ...currentItem,
                quantity: currentItem.quantity - 1
            };
        } else {
            cartItems.splice(itemIndex, 1);
        }
        cartItems = [...cartItems];
    }
  }

  function removeFromCart(itemId: number) {
    cartItems = cartItems.filter(c => c.item.id !== itemId);
    
    try {
      cart.set(cartItems);
    } catch (error) {
      console.warn('Could not update cart store, using local state only');
    }
  }

  // ========== NAVIGATION FUNCTIONS ==========
  function setSection(section: typeof activeSection) {
    if (section === "products" && activeSection === "products") {
      showSubmenu = false;
      hoveredNav = "";
    } else {
      activeSection = section;
      showSubmenu = section === "products";
      if (section !== "products") activeSubmenu = null;
    }
  }

  function selectMainCategory(category: MainCategory) {
    selectedMainCategory = category;
    selectedGender = category.genders[0];
    selectedGenderIndex = 0;
    selectedKidsCategory = null;
    selectedProduct = null;
    selectedProductName = null;
  }

  function selectGender(index: number) {
    if (!selectedMainCategory || selectedMainCategory.genders.length <= index) return;

    selectedGenderIndex = index;
    selectedGender = selectedMainCategory.genders[index];
    selectedKidsCategory = null;
    selectedProduct = null;
    selectedProductName = null;
  }

  function selectKidsCategory(categoryName: string) {
    selectedKidsCategory = categoryName;
    selectedProduct = null;
    selectedProductName = null;
  }

  function selectProduct(product: Product) {
    selectedProduct = product;
    selectedProductName = product.name;
  }

  function goBack() {
    selectedProduct = null;
    selectedProductName = null;
  }

  function selectSubitem(subitem: SubItem) {
    selectedSubitem = subitem;
    quantity = 1;
  }

  // ========== CHECKOUT FUNCTIONS ==========
  function openCheckout() {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    showCheckoutModal = true;
    paymentMethod = null;
    cashAmount = 0;
    changeAmount = 0;
  }

  function closeCheckoutModal() {
    showCheckoutModal = false;
    paymentMethod = null;
    cashAmount = 0;
    changeAmount = 0;
  }

  function selectPaymentMethod(method: "card" | "cash") {
    paymentMethod = method;
    if (method === "cash") {
      cashAmount = Math.ceil(cartTotal * 1.08); 
      calculateChange();
    }
  }

  function calculateChange() {
    changeAmount = Math.max(0, cashAmount - (cartTotal * 1.08));
  }

  function processPayment() {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (paymentMethod === "cash" && cashAmount < (cartTotal * 1.08)) {
      alert('Cash amount is insufficient');
      return;
    }

    transactionDetails = {
      id: 'TXN-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }),
      items: cartItems,
      subtotal: cartTotal,
      tax: cartTotal * 0.03,
      total: cartTotal * 1.08,
      paymentMethod: paymentMethod,
      cashAmount: paymentMethod === 'cash' ? cashAmount : null,
      change: paymentMethod === 'cash' ? changeAmount : null
    };

    updateDataAfterCheckout(cartTotal, cartItems.length);

    showCheckoutModal = false;
    showSuccessModal = true;
  }

  function updateDataAfterCheckout(totalAmount: number, itemsCount: number) {
    dashboardData.todaySales = totalAmount;
    dashboardData.pendingOrders = Math.max(1, Math.floor(itemsCount * 0.3));
    dashboardData.newCustomers = Math.max(1, Math.floor(itemsCount * 0.2));
    dashboardData.conversionRate = Math.min(5, Math.max(1, itemsCount * 0.8));

    reportData.totalSales = totalAmount;
    reportData.totalOrders = itemsCount;
    reportData.productStatistic = Math.max(100, itemsCount * 15);
    reportData.visitor = Math.max(50, Math.floor(itemsCount * 8));
    reportData.totalSoldProducts = itemsCount;

    consumerData.totalConsumers = Math.max(10, Math.floor(itemsCount * 3));
    consumerData.activeConsumers = Math.floor(consumerData.totalConsumers * 0.8);
    consumerData.newThisMonth = Math.max(1, Math.floor(itemsCount * 1.5));

    transactionData.totalAmount = totalAmount;
    transactionData.completedAmount = Math.floor(totalAmount * 0.78);
    transactionData.pendingAmount = Math.floor(totalAmount * 0.22);

    invoiceData.paid = Math.max(1, Math.floor(itemsCount * 2.4));
    invoiceData.pending = Math.max(1, Math.floor(itemsCount * 0.9));
    invoiceData.overdue = Math.max(1, Math.floor(itemsCount * 0.12));

    feedbackData.totalReviews = Math.max(5, Math.floor(itemsCount * 12));
    feedbackData.positiveReviews = Math.floor(feedbackData.totalReviews * 0.83);
    feedbackData.averageRating = 4.5;
  }

  function printReceipt() {
    const receiptContent = document.querySelector('.success-modal-content');
    if (receiptContent) {
      const printWindow = window.open('', '_blank');
      printWindow?.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Receipt - Aegix</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              max-width: 300px; 
              margin: 20px; 
              line-height: 1.4;
            }
            .header { text-align: center; margin-bottom: 20px; }
            .divider { border-top: 1px dashed #000; margin: 15px 0; }
            .item { display: flex; justify-content: space-between; margin: 5px 0; }
            .total { font-weight: bold; margin-top: 10px; }
            .footer { text-align: center; margin-top: 20px; font-size: 0.9em; }
          </style>
        </head>
        <body>
          ${receiptContent.innerHTML}
        </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.print();
    }
  }

  function startNewSale() {
    cartItems = [];
    try {
      cart.set([]);
    } catch (error) {
      console.warn('Could not clear cart store');
    }
    
    showSuccessModal = false;
    transactionDetails = null;
  }

  // ========== SETTINGS FUNCTIONS ==========
  function openSettingsModal(setting: string, title: string) {
    currentSetting = setting;
    settingsModalTitle = title;
    showSettingsModal = true;
    
    switch(setting) {
      case 'profile':
        settingsModalContent = 'profile';
        break;
      case 'security':
        settingsModalContent = 'security';
        break;
      case 'notifications':
        settingsModalContent = 'notifications';
        break;
      case 'store-info':
        settingsModalContent = 'store-info';
        break;
      case 'payments':
        settingsModalContent = 'payments';
        break;
      case 'shipping':
        settingsModalContent = 'shipping';
        break;
      case 'tax':
        settingsModalContent = 'tax';
        break;
      case 'currency':
        settingsModalContent = 'currency';
        break;
      case 'hours':
        settingsModalContent = 'hours';
        break;
    }
  }
  
  function closeSettingsModal() {
    showSettingsModal = false;
    settingsModalTitle = "";
    settingsModalContent = "";
    currentSetting = "";
  }
  
  function updateProfile() {
    console.log("Profile updated:", profileInfo);
    closeSettingsModal();
  }
  
  function updateSecurity() {
    console.log("Security settings updated:", securitySettings);
    closeSettingsModal();
  }
  
  function updateNotifications() {
    console.log("Notification preferences updated:", notificationPrefs);
    closeSettingsModal();
  }
  
  function updateStoreInfo() {
    console.log("Store information updated:", storeInfo);
    closeSettingsModal();
  }
  
  function updatePaymentMethods() {
    console.log("Payment methods updated:", paymentMethods);
    closeSettingsModal();
  }
  
  function updateShippingOptions() {
    console.log("Shipping options updated:", shippingOptions);
    closeSettingsModal();
  }
  
  function updateTaxConfig() {
    console.log("Tax configuration updated:", taxConfig);
    closeSettingsModal();
  }
  
  function updateCurrency() {
    console.log("Currency settings updated:", currencySettings);
    closeSettingsModal();
  }
  
  function updateBusinessHours() {
    console.log("Business hours updated:", businessHours);
    closeSettingsModal();
  }
  
  function addPaymentMethod() {
    paymentMethods = [...paymentMethods, {
      id: paymentMethods.length + 1,
      type: "New Method",
      lastFour: "0000",
      isDefault: false
    }];
  }
  
  function removePaymentMethod(id: number) {
    paymentMethods = paymentMethods.filter(method => method.id !== id);
  }
  
  function setDefaultPaymentMethod(id: number) {
    paymentMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }));
  }

  // ========== FEEDBACK DATA ==========
  let userFeedbacks: Array<{
    customer: string;
    product: string;
    rating: number;
    comment: string;
    date: string;
  }> = [];

  let newFeedback = {
    customer: '',
    product: '',
    rating: 0,
    comment: ''
  };

  function addNewFeedback() {
    if (!newFeedback.customer || !newFeedback.product || !newFeedback.comment || newFeedback.rating === 0) {
      alert('Please fill in all fields and select a rating');
      return;
    }

    const feedback = {
      customer: newFeedback.customer,
      product: newFeedback.product,
      rating: newFeedback.rating,
      comment: newFeedback.comment,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };

    userFeedbacks = [feedback, ...userFeedbacks];
    
    // Update feedback data metrics
    feedbackData.totalReviews = userFeedbacks.length;
    feedbackData.positiveReviews = userFeedbacks.filter(fb => fb.rating >= 4).length;
    feedbackData.averageRating = userFeedbacks.length > 0 
      ? userFeedbacks.reduce((sum, fb) => sum + fb.rating, 0) / userFeedbacks.length
      : 0;

    // Reset form
    newFeedback = {
      customer: '',
      product: '',
      rating: 0,
      comment: ''
    };

    alert('Thank you for your feedback!');
  }

  // ========== LIFECYCLE ==========
  onMount(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedLoginState === 'true' && savedUser) {
      isLoggedIn = true;
      currentUser = savedUser;
      showModal = false;
    } else {
      isLoggedIn = false;
      showModal = true; 
    }

    if (typeof categories !== 'undefined' && categories.length > 0) {
      selectedMainCategory = categories[0]; 
      if (categories[0].genders.length > 0) {
        selectedGender = categories[0].genders[0]; 
        selectedGenderIndex = 0;
        activeSubmenu = "Clothing";
      }
    }
    
    try {
      const storeCart = get(cart);
      if (Array.isArray(storeCart)) {
        cartItems = storeCart;
      }
    } catch (error) {
      console.warn('Cart store not available on mount');
    }
    
    document.title = "Aegix";
  });
</script>

<div class="main-background">
    <div class="sidebar-container">
        <div class="sidebar">
            <button class="logo" on:click={() => setSection('dashboard')}>
                <div class="img-wrapper">
                    <img src="/logo.png" alt="Logo" />
                </div>
            </button>

            <button class="text" on:click={() => setSection('dashboard')}>
                <div class="text-wrapper">
                    <span>Aegix</span>
                </div>
            </button>

            <div class="section-title">MENU</div>
            <div class="nav-item {activeSection === 'dashboard' ? 'active' : ''}" on:click={() => setSection('dashboard')}>
                <i class="bx bx-home-alt"></i><span>Dashboard</span>
            </div>

            <div class="nav-item {activeSection === 'report' ? 'active' : ''}" on:click={() => setSection('report')}>
                <i class="bx bx-book-alt"></i><span>Report</span>
            </div>

            <div class="nav-item {activeSection === 'products' ? 'active' : ''}" on:click={() => setSection('products')}>
                <i class="bx bx-box"></i><span>Products</span>
            </div>

            <div class="nav-item {activeSection === 'consumer' ? 'active' : ''}" on:click={() => setSection('consumer')}>
                <i class="bx bx-user"></i><span>Consumer</span>
            </div>

            <div class="section-title">FINANCIAL</div>
            <div class="nav-item {activeSection === 'transactions' ? 'active' : ''}" on:click={() => setSection('transactions')}>
                <i class="bx bx-receipt"></i><span>Transactions</span>
            </div>

            <div class="nav-item {activeSection === 'invoices' ? 'active' : ''}" on:click={() => setSection('invoices')}>
                <i class="bx bx-file"></i><span>Invoices</span>
            </div>

            <div class="section-title">TOOLS</div>
            <div class="nav-item {activeSection === 'settings' ? 'active' : ''}" on:click={() => setSection('settings')}>
                <i class="bx bx-cog"></i><span>Settings</span>
            </div>

            <div class="nav-item {activeSection === 'feedback' ? 'active' : ''}" on:click={() => setSection('feedback')}>
                <i class="bx bx-edit"></i><span>Feedback</span>
            </div>

            <div class="nav-item {activeSection === 'help' ? 'active' : ''}" on:click={() => setSection('help')}>
                <i class="bx bx-help-circle"></i><span>Help</span>
            </div>

            <div class="register-section">
                {#if isLoggedIn}
                    <div class="user-welcome">
                    <span>Hi! {currentUser} Welcome</span>
                    <button class="logout-btn" on:click={logout}>Logout</button>
                    </div>
                {:else}
                    <button class="register-btn" on:click={register}>
                    <span>Register</span>
                    </button>
                {/if}
            </div>

            {#if showModal}
                <div class="modal-overlay" id="modal-overlay" on:click={handleOverlayClick}>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Log In</h2>
                            <button class="close-btn" on:click={() => showModal = false}>×</button>
                        </div>
                        
                        <div class="container">
                            <form class="form-panel" id="auth-form" on:submit={handleSubmit}>
                                <div class="input-group">
                                    <div class="input-wrapper">
                                        <span class="bx bx-user icon"></span>
                                        <input 
                                            type="text" 
                                            id="login-username"
                                            placeholder="Username" 
                                            required 
                                            maxlength="6"
                                            on:input={handleUsernameInput}
                                        />
                                    </div>
                                    <div class="input-wrapper">
                                        <span class="bx bx-lock-open-alt icon"></span>
                                        <input 
                                            type="password" 
                                            id="login-password"
                                            placeholder="Password" 
                                            required 
                                        />
                                    </div>
                                </div>
                                
                                <button type="submit" class="submit-btn">
                                    Log In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>

    <div class="main-container">
        <div class="main-content 
            {activeSection === 'dashboard' ? 'main-content1' : ''} 
            {activeSection === 'report' ? 'main-content2' : ''}
            {activeSection === 'products' ? 'main-content3' : ''}
            {['consumer','transactions','invoices','settings','feedback'].includes(activeSection) ? 'main-content4' : ''}
            {activeSection === 'help' ? 'main-content5' : ''}">

            {#if activeSection === "dashboard"}
                <div class="dashboard-container">
                    <!-- Sales Overview -->
                    <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-info">
                        <h3>Today's Sales</h3>
                        <p class="stat-value">₱{dashboardData.todaySales.toLocaleString()}</p>
                        <span class="stat-change {dashboardData.todaySales > 0 ? 'positive' : ''}">
                            {dashboardData.todaySales > 0 ? '+12%' : 'No sales yet'}
                        </span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">📦</div>
                        <div class="stat-info">
                        <h3>Pending Orders</h3>
                        <p class="stat-value">{dashboardData.pendingOrders}</p>
                        <span class="stat-change {dashboardData.pendingOrders > 0 ? '' : 'positive'}">
                            {dashboardData.pendingOrders > 0 ? 'Need Attention' : 'All clear'}
                        </span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-info">
                        <h3>New Customers</h3>
                        <p class="stat-value">{dashboardData.newCustomers}</p>
                        <span class="stat-change {dashboardData.newCustomers > 0 ? 'positive' : ''}">
                            {dashboardData.newCustomers > 0 ? '+5%' : 'No new customers'}
                        </span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-info">
                        <h3>Conversion Rate</h3>
                        <p class="stat-value">{dashboardData.conversionRate.toFixed(1)}%</p>
                        <span class="stat-change {dashboardData.conversionRate > 0 ? 'positive' : ''}">
                            {dashboardData.conversionRate > 0 ? '+0.4%' : 'No activity'}
                        </span>
                        </div>
                    </div>
                    </div>

                    <!-- Charts Section -->
                    <div class="charts-grid">
                    <div class="chart-card">
                        <h3>Sales Trend (Last 7 Days)</h3>
                        <div class="chart-placeholder">
                        {#if dashboardData.todaySales > 0}
                            📈 Sales: ₱{dashboardData.todaySales.toLocaleString()}
                        {:else}
                            📈 No data available
                        {/if}
                        </div>
                    </div>
                    
                    <div class="chart-card">
                        <h3>Top Categories</h3>
                        <div class="chart-placeholder">
                        {#if dashboardData.todaySales > 0}
                            🍩 Active Categories
                        {:else}
                            🍩 No data available
                        {/if}
                        </div>
                    </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="activity-card">
                    <h3>Recent Activity</h3>
                    <div class="activity-list">
                        {#if dashboardData.todaySales > 0}
                        <div class="activity-item">
                            <span class="activity-icon">🛒</span>
                            <div class="activity-details">
                            <p>New sale completed - ₱{dashboardData.todaySales.toLocaleString()}</p>
                            <small>Just now</small>
                            </div>
                            <span class="activity-amount">₱{dashboardData.todaySales.toLocaleString()}</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-icon">👤</span>
                            <div class="activity-details">
                            <p>{dashboardData.newCustomers} new customer(s) registered</p>
                            <small>Today</small>
                            </div>
                        </div>
                        {:else}
                        <div class="activity-item">
                            <span class="activity-icon">ℹ️</span>
                            <div class="activity-details">
                            <p>No recent activity</p>
                            <small>Start making sales to see activity</small>
                            </div>
                        </div>
                        {/if}
                    </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="quick-actions">
                    <h3>Quick Actions</h3>
                    <div class="action-buttons">
                        <button class="action-btn" on:click={() => setSection('products')}>
                        <span>➕</span>
                        Add Product
                        </button>
                        <button class="action-btn" on:click={() => setSection('invoices')}>
                        <span>🧾</span>
                        Create Invoice
                        </button>
                        <button class="action-btn" on:click={() => setSection('report')}>
                        <span>📊</span>
                        View Reports
                        </button>
                    </div>
                    </div>
                </div>
            {/if}

            {#if activeSection === "report"}
                <section class="analytics-dashboard">
                    <div class="dashboard-grid">
                    <div class="card card1 blue">
                        <div class="card-header1">
                        <h2>Total Sales</h2>
                        <span class="{reportData.totalSales > 0 ? 'positive1' : 'muted5'}">
                            {reportData.totalSales > 0 ? '+2.08%' : 'No data'}
                        </span>
                        </div>
                        <p class="value1">₱{reportData.totalSales.toLocaleString()}</p>
                        <p class="desc1">Products vs last month</p>
                    </div>

                    <div class="card card2">
                        <div class="card-header2">
                        <h2>Total Orders</h2>
                        <span class="{reportData.totalOrders > 0 ? 'positive2' : 'muted5'}">
                            {reportData.totalOrders > 0 ? '+12.4%' : 'No data'}
                        </span>
                        </div>
                        <p class="value2">{reportData.totalOrders.toLocaleString()}</p>
                        <p class="desc2">Orders vs last month</p>
                    </div>

                    <div class="card card5">
                        <div class="card-header5">
                        <h2>Product Statistic</h2>
                        <span class="muted5">Today</span>
                        </div>
                        <div class="stat-body">
                        <p class="value5">{reportData.productStatistic.toLocaleString()}</p>
                        <p class="{reportData.productStatistic > 0 ? 'positive5' : 'muted5'}">
                            {reportData.productStatistic > 0 ? '+5.34%' : 'No activity'}
                        </p>
                        <ul>
                            <li><span>💡 Electronic</span><span class="{reportData.productStatistic > 0 ? 'positive6' : 'muted5'}">
                            {reportData.productStatistic > 0 ? '+1.8%' : '0%'}
                            </span></li>
                            <li><span>🎮 Games</span><span class="{reportData.productStatistic > 0 ? 'positive7' : 'muted5'}">
                            {reportData.productStatistic > 0 ? '+2.3%' : '0%'}
                            </span></li>
                            <li><span>🪑 Furniture</span><span class="{reportData.productStatistic > 0 ? 'negative5' : 'muted5'}">
                            {reportData.productStatistic > 0 ? '-1.04%' : '0%'}
                            </span></li>
                        </ul>
                        </div>
                    </div>

                    <div class="card card3">
                        <div class="card-header3">
                        <h2>Visitor</h2>
                        <span class="{reportData.visitor > 0 ? 'negative3' : 'muted5'}">
                            {reportData.visitor > 0 ? '-2.08%' : 'No visitors'}
                        </span>
                        </div>
                        <p class="value3">{reportData.visitor.toLocaleString()}</p>
                        <p class="desc3">Users vs last month</p>
                    </div>

                    <div class="card card4">
                        <div class="card-header4">
                        <h2>Total Sold Products</h2>
                        <span class="{reportData.totalSoldProducts > 0 ? 'positive4' : 'muted5'}">
                            {reportData.totalSoldProducts > 0 ? '+12.1%' : 'No sales'}
                        </span>
                        </div>
                        <p class="value4">{reportData.totalSoldProducts.toLocaleString()}</p>
                        <p class="desc4">Products vs last month</p>
                    </div>

                    <div class="card card6">
                        <div class="card-header6">
                        <h2>Customer Habits</h2>
                        <span class="muted6">This year</span>
                        </div>
                        <div class="chart-placeholder6">
                        {#if reportData.totalSales > 0}
                            📊 Active Customer Data
                        {:else}
                            📊 No data available
                        {/if}
                        </div>
                    </div>

                    <div class="card card7">
                        <div class="card-header7">
                        <h2>Customer Growth</h2>
                        <span class="muted7">Today</span>
                        </div>
                        <ul class="growth-list7">
                        {#if reportData.totalSales > 0}
                            <li><span>🇺🇸 United States</span><span>{Math.floor(reportData.visitor * 0.4)}</span></li>
                            <li><span>🇩🇪 Germany</span><span>{Math.floor(reportData.visitor * 0.3)}</span></li>
                            <li><span>🇦🇺 Australia</span><span>{Math.floor(reportData.visitor * 0.2)}</span></li>
                            <li><span>🇫🇷 France</span><span>{Math.floor(reportData.visitor * 0.1)}</span></li>
                        {:else}
                            <li><span>🇺🇸 United States</span><span>0</span></li>
                            <li><span>🇩🇪 Germany</span><span>0</span></li>
                            <li><span>🇦🇺 Australia</span><span>0</span></li>
                            <li><span>🇫🇷 France</span><span>0</span></li>
                        {/if}
                        </ul>
                    </div>
                    </div>
                </section>
            {/if}
        
            {#if activeSection === "products"}
                <div class="main-category-tabs">
                    {#each categories as category}
                        <button 
                            class:selected={selectedMainCategory?.id === category.id}
                            on:click={() => selectMainCategory(category)}
                        >
                            {category.name}
                        </button>
                    {/each}
                    
                    {#if selectedProductName}
                        <div class="selected-product-indicator">
                            <span>{selectedProductName}</span>
                        </div>
                    {/if}
                </div>

                {#if selectedMainCategory && selectedMainCategory.genders && selectedMainCategory.genders.length > 0}
                    <div class="gender-tabs-container">
                        <div class="tabs-section">
                            <div class="gender-tabs">
                                {#each selectedMainCategory.genders as gender, index}
                                    <button 
                                        class:selected={selectedGenderIndex === index} 
                                        on:click={() => selectGender(index)}
                                    >
                                        {gender.name}
                                    </button>
                                {/each}
                            </div>

                            {#if selectedGenderIndex === 2 && selectedGender.children}
                                <div class="kids-tabs">
                                    {#each selectedGender.children as child}
                                        <button 
                                            class:selected={selectedKidsCategory === child.name} 
                                            on:click={() => selectKidsCategory(child.name)}
                                        >
                                            {child.name}
                                        </button>
                                    {/each}
                                </div>
                            {/if}
                        </div>

                        {#if selectedProduct}
                            <div class="search-bar-container">
                                <i class="bx bx-search"></i>
                                <input 
                                    type="text" 
                                    class="search-bar" 
                                    placeholder="Search subitems..." 
                                    bind:value={searchQuery}
                                />
                            </div>
                        {/if}
                    </div>

                    <div class="product-container">
                        {#if selectedProduct}
                            <div class="subitems-section">
                                <button on:click={goBack} class="back-button">← Back</button>
                                <div class="subitems-grid">
                                    {#each filteredSubitems as subitem}
                                        <div class="subitem-item">
                                            <div class="subitem-image-container">
                                                <img src={subitem.image} alt={subitem.name} />
                                            </div>
                                            <div class="subitem-info" data-parent-category="{selectedProduct?.name.toLowerCase()}">
                                                <h4 class="subitem-name">{subitem.name}</h4>
                                                <p class="subitem-price">₱{subitem.price.toLocaleString()}</p>
                                            </div>
                                            <button
                                                class="add-cart-btn {isSubitemInCart(subitem) ? 'uncart-btn' : ''}"
                                                on:click={() => toggleSubitemInCart(subitem)}
                                            >
                                                {isSubitemInCart(subitem) ? 'Uncart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    {/each}
                                </div>

                            </div>
                        {:else}
                            <div class="product-grid-section">
                                
                                {#if currentProducts && currentProducts.length > 0}
                                    <div class="product-grid">
                                        {#each currentProducts as product}
                                            <div class="product-item" on:click={() => selectProduct(product)}>
                                                <div class="product-image-container">
                                                    <img src={product.image} alt={product.name} />
                                                </div>
                                                <div class="product-info">
                                                    <h3 class="product-name" data-category="{product.name.toLowerCase()}">{product.name}</h3>
                                                    <small class="product-count">{product.subitems?.length || 0} items</small>
                                                </div>
                                            </div>
                                        {/each}
                                    </div>
                                {:else}
                                    <div class="no-products-message">
                                        {#if selectedGenderIndex === 2 && !selectedKidsCategory}
                                            <p>Please select Boys or Girls to view products</p>
                                        {/if}
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/if}
            {/if}

            {#if activeSection === "consumer"}
                <div class="consumer-management">
                    <div class="section-header">
                    <h2>Consumer Management</h2>
                    <div class="search-container">
                        <i class="bx bx-search"></i>
                        <input type="text" placeholder="Search consumers..." class="search-input" />
                    </div>
                    </div>

                    <div class="metrics-grid-consumer">
                    <div class="metric-card-consumer">
                        <div class="metric-icon">👥</div>
                        <div class="metric-content">
                        <h3>Total Consumers</h3>
                        <div class="metric-value-consumer">{consumerData.totalConsumers.toLocaleString()}</div>
                        <div class="metric-change {consumerData.totalConsumers > 0 ? 'positive' : ''}">
                            {consumerData.totalConsumers > 0 ? '+5.2%' : 'No growth'}
                        </div>
                        </div>
                    </div>

                    <div class="metric-card-consumer">
                        <div class="metric-icon">✅</div>
                        <div class="metric-content">
                        <h3>Active Consumers</h3>
                        <div class="metric-value-consumer">{consumerData.activeConsumers.toLocaleString()}</div>
                        <div class="metric-change {consumerData.activeConsumers > 0 ? 'positive' : ''}">
                            {consumerData.activeConsumers > 0 ? '+3.1%' : 'No activity'}
                        </div>
                        </div>
                    </div>

                    <div class="metric-card-consumer">
                        <div class="metric-icon">🆕</div>
                        <div class="metric-content">
                        <h3>New This Month</h3>
                        <div class="metric-value-consumer">{consumerData.newThisMonth.toLocaleString()}</div>
                        <div class="metric-change {consumerData.newThisMonth > 0 ? 'positive' : ''}">
                            {consumerData.newThisMonth > 0 ? '+12.8%' : 'No new consumers'}
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="recent-consumers">
                    <h3>Recent Consumers</h3>
                    <div class="consumers-list">
                        {#if consumerData.totalConsumers > 0}
                        {#each Array.from({length: Math.min(5, consumerData.newThisMonth)}, (_, i) => i) as index}
                            <div class="consumer-item">
                            <div class="consumer-avatar">
                                <div class="avatar-placeholder">C{index + 1}</div>
                            </div>
                            <div class="consumer-details">
                                <h4>Customer {index + 1}</h4>
                                <p>customer{index + 1}@example.com</p>
                            </div>
                            <div class="consumer-status active">
                                Active
                            </div>
                            <div class="consumer-actions">
                                <button class="action-btn view">View</button>
                                <button class="action-btn edit">Edit</button>
                            </div>
                            </div>
                        {/each}
                        {:else}
                        <div class="consumer-item empty-state">
                            <div class="consumer-details">
                            <p>No consumer data available</p>
                            <small>Consumer data will appear after transactions</small>
                            </div>
                        </div>
                        {/if}
                    </div>
                    </div>
                </div>
            {/if}

            {#if activeSection === "transactions"}
                <div class="transactions-management">
                    <div class="section-header">
                    <h2>Transactions</h2>
                    <div class="date-filter">
                        <select>
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>Custom Range</option>
                        </select>
                    </div>
                    </div>

                    <div class="metrics-grid-transactions">
                    <div class="metric-card-transaction">
                        <div class="metric-icon">💰</div>
                        <div class="metric-content">
                        <h3>Total Amount</h3>
                        <div class="metric-value-transaction">₱{transactionData.totalAmount.toLocaleString()}</div>
                        <div class="metric-change {transactionData.totalAmount > 0 ? 'positive' : ''}">
                            {transactionData.totalAmount > 0 ? '+8.5%' : 'No transactions'}
                        </div>
                        </div>
                    </div>

                    <div class="metric-card-transaction">
                        <div class="metric-icon">✅</div>
                        <div class="metric-content">
                        <h3>Completed</h3>
                        <div class="metric-value-transaction">₱{transactionData.completedAmount.toLocaleString()}</div>
                        <div class="metric-desc">
                            {transactionData.totalAmount > 0 ? '78% of total' : 'No transactions'}
                        </div>
                        </div>
                    </div>

                    <div class="metric-card-transaction">
                        <div class="metric-icon">⏳</div>
                        <div class="metric-content">
                        <h3>Pending</h3>
                        <div class="metric-value-transaction">₱{transactionData.pendingAmount.toLocaleString()}</div>
                        <div class="metric-desc">
                            {transactionData.totalAmount > 0 ? '22% of total' : 'No transactions'}
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="recent-transactions">
                    <h3>Recent Transactions</h3>
                    <div class="transactions-list">
                        {#if transactionData.totalAmount > 0}
                        <div class="transaction-item">
                            <div class="transaction-icon">💳</div>
                            <div class="transaction-details">
                            <h4>TXN-{Date.now()}</h4>
                            <p>Customer • {new Date().toLocaleDateString()}</p>
                            </div>
                            <div class="transaction-amount">₱{transactionData.totalAmount.toLocaleString()}</div>
                            <div class="transaction-status completed">
                            Completed
                            </div>
                            <div class="transaction-actions">
                            <button class="action-btn view">Details</button>
                            </div>
                        </div>
                        {:else}
                        <div class="transaction-item empty-state">
                            <div class="transaction-details">
                            <p>No transactions yet</p>
                            <small>Transactions will appear after successful checkouts</small>
                            </div>
                        </div>
                        {/if}
                    </div>
                    </div>
                </div>
            {/if}

            {#if activeSection === "invoices"}
                <div class="invoices-management">
                    <div class="section-header">
                    <h2>Invoices</h2>
                    <div class="header-actions">
                        <button class="btn-primary">+ Create Invoice</button>
                        <div class="filter-container">
                        <select>
                            <option>All Status</option>
                            <option>Paid</option>
                            <option>Pending</option>
                            <option>Overdue</option>
                        </select>
                        </div>
                    </div>
                    </div>

                    <div class="metrics-grid-invoices">
                    <div class="metric-card-invoice paid">
                        <div class="metric-content">
                        <h3>Paid</h3>
                        <div class="metric-value-invoice">{invoiceData.paid}</div>
                        <div class="metric-desc">
                            {invoiceData.paid > 0 ? '68% of total' : 'No invoices'}
                        </div>
                        </div>
                    </div>

                    <div class="metric-card-invoice pending">
                        <div class="metric-content">
                        <h3>Pending</h3>
                        <div class="metric-value-invoice">{invoiceData.pending}</div>
                        <div class="metric-desc">
                            {invoiceData.pending > 0 ? '25% of total' : 'No invoices'}
                        </div>
                        </div>
                    </div>

                    <div class="metric-card-invoice overdue">
                        <div class="metric-content">
                        <h3>Overdue</h3>
                        <div class="metric-value-invoice">{invoiceData.overdue}</div>
                        <div class="metric-desc">
                            {invoiceData.overdue > 0 ? '7% of total' : 'No invoices'}
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="recent-invoices">
                    <h3>Recent Invoices</h3>
                    <div class="invoices-list">
                        {#if invoiceData.paid > 0}
                        {#each Array.from({length: Math.min(5, invoiceData.paid + invoiceData.pending + invoiceData.overdue)}, (_, i) => i) as index}
                            <div class="invoice-item">
                            <div class="invoice-icon">📄</div>
                            <div class="invoice-details">
                                <h4>INV-{new Date().getFullYear()}-{String(index + 1).padStart(3, '0')}</h4>
                                <p>Customer {index + 1} • Due: {new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                            </div>
                            <div class="invoice-amount">₱{Math.floor(dashboardData.todaySales * 0.8 + index * 500).toLocaleString()}</div>
                            <div class="invoice-status {index % 3 === 0 ? 'paid' : index % 3 === 1 ? 'pending' : 'overdue'}">
                                {index % 3 === 0 ? 'Paid' : index % 3 === 1 ? 'Pending' : 'Overdue'}
                            </div>
                            <div class="invoice-actions">
                                <button class="action-btn view">View</button>
                                <button class="action-btn download">Download</button>
                            </div>
                            </div>
                        {/each}
                        {:else}
                        <div class="invoice-item empty-state">
                            <div class="invoice-details">
                            <p>No invoices available</p>
                            <small>Invoices will appear after transactions</small>
                            </div>
                        </div>
                        {/if}
                    </div>
                    </div>
                </div>
            {/if}


            {#if activeSection === "settings"}
                <div class="settings-management">
                    <div class="section-header">
                        <h2>Settings</h2>
                        <p>Manage your account and application settings</p>
                    </div>

                    <div class="settings-grid">
                        <div class="settings-category">
                            <div class="category-header">
                                <div class="category-icon">🔒</div>
                                <h3>Account Settings</h3>
                            </div>
                            <div class="settings-options">
                                <div class="setting-option">
                                    <span>Profile Information</span>
                                    <button class="btn-outline" on:click={() => openSettingsModal('profile', 'Edit Profile Information')}>Edit</button>
                                </div>
                                <div class="setting-option">
                                    <span>Security & Password</span>
                                    <button class="btn-outline" on:click={() => openSettingsModal('security', 'Manage Security Settings')}>Manage</button>
                                </div>
                                <div class="setting-option">
                                    <span>Notification Preferences</span>
                                    <button class="btn-outline" on:click={() => openSettingsModal('notifications', 'Configure Notification Preferences')}>Configure</button>
                                </div>
                            </div>
                        </div>

                        <div class="settings-category">
                            <div class="category-header">
                                <div class="category-icon">🛍️</div>
                                <h3>Store Settings</h3>
                            </div>
                            <div class="settings-options">
                                <div class="setting-option">
                                    <span>General Information</span>
                                    <button class="btn-outline" on:click={() => openSettingsModal('store-info', 'Edit Store Information')}>Edit</button>
                                </div>
                                <div class="setting-option">
                                    <span>Payment Methods</span>
                                    <button class="btn-outline" on:click={() => openSettingsModal('payments', 'Manage Payment Methods')}>Manage</button>
                                </div>
                                <div class="setting-option">
                                    <span>Shipping Options</span>
                                    <button class="btn-outline" on:click={() => openSettingsModal('shipping', 'Configure Shipping Options')}>Configure</button>
                                </div>
                            </div>
                        </div>

                        <div class="settings-category">
                            <div class="category-header">
                                <div class="category-icon">📊</div>
                                <h3>Business Settings</h3>
                            </div>
                            <div class="settings-options">
                                <div class="setting-option">
                                    <span>Tax Configuration</span>
                                    <button class="btn-outline" on:click={() => openSettingsModal('tax', 'Setup Tax Configuration')}>Setup</button>
                                </div>
                                <div class="setting-option">
                                    <span>Currency Settings</span>
                                    <button class="btn-outline" on:click={() => openSettingsModal('currency', 'Change Currency Settings')}>Change</button>
                                </div>
                                <div class="setting-option">
                                    <span>Business Hours</span>
                                    <button class="btn-outline" on:click={() => openSettingsModal('hours', 'Set Business Hours')}>Set</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}

            {#if showSettingsModal}
            <div class="modal-overlay" on:click={closeSettingsModal}>
                <div class="modal-content" on:click|stopPropagation>
                    <div class="modal-header">
                        <h3>{settingsModalTitle}</h3>
                        <button class="close-btn" on:click={closeSettingsModal}>×</button>
                    </div>
                    
                    <div class="modal-body">
                        {#if settingsModalContent === 'profile'}
                            <div class="form-group">
                                <label for="name">Full Name</label>
                                <input id="name" type="text" bind:value={profileInfo.name}>
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input id="email" type="email" bind:value={profileInfo.email}>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input id="phone" type="tel" bind:value={profileInfo.phone}>
                            </div>
                            <button class="btn-primary" on:click={updateProfile}>Save Changes</button>
                        
                        {:else if settingsModalContent === 'security'}
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" bind:checked={securitySettings.twoFactorEnabled}>
                                    Enable Two-Factor Authentication
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="current-password">Current Password</label>
                                <input id="current-password" type="password">
                            </div>
                            <div class="form-group">
                                <label for="new-password">New Password</label>
                                <input id="new-password" type="password">
                            </div>
                            <div class="form-group">
                                <label for="confirm-password">Confirm New Password</label>
                                <input id="confirm-password" type="password">
                            </div>
                            <button class="btn-primary" on:click={updateSecurity}>Update Security Settings</button>
                        
                        {:else if settingsModalContent === 'notifications'}
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" bind:checked={notificationPrefs.emailNotifications}>
                                    Email Notifications
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" bind:checked={notificationPrefs.smsNotifications}>
                                    SMS Notifications
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" bind:checked={notificationPrefs.pushNotifications}>
                                    Push Notifications
                                </label>
                            </div>
                            <button class="btn-primary" on:click={updateNotifications}>Save Preferences</button>
                        
                        {:else if settingsModalContent === 'store-info'}
                            <div class="form-group">
                                <label for="store-name">Store Name</label>
                                <input id="store-name" type="text" bind:value={storeInfo.name}>
                            </div>
                            <div class="form-group">
                                <label for="store-description">Store Description</label>
                                <textarea id="store-description" bind:value={storeInfo.description}></textarea>
                            </div>
                            <div class="form-group">
                                <label for="store-email">Contact Email</label>
                                <input id="store-email" type="email" bind:value={storeInfo.contactEmail}>
                            </div>
                            <button class="btn-primary" on:click={updateStoreInfo}>Save Store Information</button>
                        
                        {:else if settingsModalContent === 'payments'}
                            <div class="payment-methods">
                                {#each paymentMethods as method (method.id)}
                                <div class="payment-method">
                                    <div class="method-info">
                                        <strong>{method.type}</strong>
                                        {#if method.lastFour}
                                        <span>•••• {method.lastFour}</span>
                                        {/if}
                                        {#if method.email}
                                        <span>{method.email}</span>
                                        {/if}
                                        {#if method.isDefault}
                                        <span class="default-badge">Default</span>
                                        {/if}
                                    </div>
                                    <div class="method-actions">
                                        {#if !method.isDefault}
                                        <button class="btn-small" on:click={() => setDefaultPaymentMethod(method.id)}>Set Default</button>
                                        {/if}
                                        <button class="btn-small btn-danger" on:click={() => removePaymentMethod(method.id)}>Remove</button>
                                    </div>
                                </div>
                                {/each}
                            </div>
                            <button class="btn-outline" on:click={addPaymentMethod}>Add Payment Method</button>
                            <button class="btn-primary" on:click={updatePaymentMethods}>Save Changes</button>
                        
                        {:else if settingsModalContent === 'shipping'}
                            <div class="shipping-options">
                                {#each shippingOptions as option (option.id)}
                                <div class="shipping-option">
                                    <div class="option-info">
                                        <strong>{option.name}</strong>
                                        <span>₱{option.cost} - {option.days} days</span>
                                    </div>
                                </div>
                                {/each}
                            </div>
                            <button class="btn-primary" on:click={updateShippingOptions}>Save Shipping Options</button>
                        
                        {:else if settingsModalContent === 'tax'}
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" bind:checked={taxConfig.enabled}>
                                    Enable Tax Calculation
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="tax-rate">Tax Rate (%)</label>
                                <input id="tax-rate" type="number" step="0.1" bind:value={taxConfig.rate}>
                            </div>
                            <div class="form-group">
                                <label for="tax-country">Country</label>
                                <input id="tax-country" type="text" bind:value={taxConfig.country}>
                            </div>
                            <button class="btn-primary" on:click={updateTaxConfig}>Save Tax Configuration</button>
                        
                        {:else if settingsModalContent === 'currency'}
                            <div class="form-group">
                                <label for="currency">Currency</label>
                                <select id="currency" bind:value={currencySettings.currency}>
                                    <option value="USD">USD - US Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="JPY">JPY - Japanese Yen</option>
                                </select>
                            </div>
                            <button class="btn-primary" on:click={updateCurrency}>Save Currency Settings</button>
                        
                        {:else if settingsModalContent === 'hours'}
                            <div class="business-hours">
                                {#each Object.entries(businessHours) as [day, hours]}
                                <div class="day-hours">
                                    <div class="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                                    <div class="hours-inputs">
                                        <label class="checkbox-label">
                                            <input type="checkbox" bind:checked={hours.closed}>
                                            Closed
                                        </label>
                                        {#if !hours.closed}
                                        <div class="time-inputs">
                                            <input type="time" bind:value={hours.open}>
                                            <span>to</span>
                                            <input type="time" bind:value={hours.close}>
                                        </div>
                                        {/if}
                                    </div>
                                </div>
                                {/each}
                            </div>
                            <button class="btn-primary" on:click={updateBusinessHours}>Save Business Hours</button>
                        {/if}
                    </div>
                </div>
            </div>
            {/if}

            {#if activeSection === "feedback"}
                <div class="feedback-management">
                    <div class="section-header">
                    <h2>Customer Feedback</h2>
                    <p>Manage and respond to customer reviews</p>
                    </div>

                    <!-- Add Feedback Form -->
                    <div class="add-feedback-section">
                    <h3>Add New Feedback</h3>
                    <div class="feedback-form">
                        <div class="form-group">
                        <label for="customer-name">Your Name</label>
                        <input 
                            type="text" 
                            id="customer-name" 
                            placeholder="Enter your name"
                            bind:value={newFeedback.customer}
                        />
                        </div>
                        <div class="form-group">
                        <label for="product-name">Product</label>
                        <input 
                            type="text" 
                            id="product-name" 
                            placeholder="Enter product name"
                            bind:value={newFeedback.product}
                        />
                        </div>
                        <div class="form-group">
                            <label>Rating</label>
                            <div class="rating-container">
                                <div class="rating-stars">
                                    {#each [1, 2, 3, 4, 5] as star}
                                    <button
                                        class="star-btn {newFeedback.rating >= star ? 'active' : ''}"
                                        on:click={() => newFeedback.rating = star}
                                        data-star={star}
                                    >
                                        ⭐
                                    </button>
                                    {/each}
                                    {#if newFeedback.rating > 0}
                                        <div class="rating-display">
                                            {newFeedback.rating} {newFeedback.rating === 1 ? 'star' : 'stars'} selected
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                        <label for="feedback-comment">Your Feedback</label>
                        <textarea 
                            id="feedback-comment" 
                            placeholder="Share your experience with the product..."
                            bind:value={newFeedback.comment}
                            rows="4"
                        ></textarea>
                        </div>
                        <button 
                        class="btn-primary" 
                        on:click={addNewFeedback}
                        disabled={!newFeedback.customer || !newFeedback.product || !newFeedback.comment || newFeedback.rating === 0}
                        >
                        Submit Feedback
                        </button>
                    </div>
                    </div>

                    <div class="metrics-grid-feedback">
                    <div class="metric-card-feedback">
                        <div class="metric-content">
                        <h3>Total Reviews</h3>
                        <div class="metric-value-feedback">{feedbackData.totalReviews.toLocaleString()}</div>
                        <div class="metric-change {feedbackData.totalReviews > 0 ? 'positive' : ''}">
                            {feedbackData.totalReviews > 0 ? '+12.3%' : 'No reviews'}
                        </div>
                        </div>
                    </div>

                    <div class="metric-card-feedback">
                        <div class="metric-content">
                        <h3>Positive Reviews</h3>
                        <div class="metric-value-feedback">{feedbackData.positiveReviews.toLocaleString()}</div>
                        <div class="metric-desc">
                            {feedbackData.totalReviews > 0 ? `${Math.round((feedbackData.positiveReviews / feedbackData.totalReviews) * 100)}% positive` : 'No reviews'}
                        </div>
                        </div>
                    </div>

                    <div class="metric-card-feedback">
                        <div class="metric-content">
                        <h3>Average Rating</h3>
                        <div class="metric-value-feedback rating">
                            {#if feedbackData.averageRating > 0}
                            ⭐{feedbackData.averageRating.toFixed(1)}/5
                            {:else}
                            No ratings
                            {/if}
                        </div>
                        <div class="metric-desc">
                            {feedbackData.totalReviews > 0 ? 'Based on all reviews' : 'No reviews yet'}
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="recent-feedback">
                    <h3>Recent Feedback</h3>
                    <div class="feedback-list">
                        {#if userFeedbacks.length > 0}
                        {#each userFeedbacks as feedback, index}
                            <div class="feedback-item">
                            <div class="feedback-rating">
                                {'⭐'.repeat(feedback.rating)}
                            </div>
                            <div class="feedback-content">
                                <p class="feedback-comment">"{feedback.comment}"</p>
                                <div class="feedback-meta">
                                <span class="customer">{feedback.customer}</span>
                                <span class="product">on {feedback.product}</span>
                                <span class="date">{feedback.date}</span>
                                </div>
                            </div>
                            <div class="feedback-actions">
                                <button class="action-btn reply">Reply</button>
                                <button class="action-btn view">View</button>
                            </div>
                            </div>
                        {/each}
                        {:else}
                        <div class="feedback-item empty-state">
                            <div class="feedback-content">
                            <p>No feedback available</p>
                            <small>Add your first feedback using the form above</small>
                            </div>
                        </div>
                        {/if}
                    </div>
                    </div>
                </div>
            {/if}

            {#if activeSection === "help"}
                <div class="help-management">
                    <div class="section-header">
                        <h2>Help & Support</h2>
                        <p>Get assistance and find answers to your questions</p>
                    </div>

                    <div class="help-grid">
                        <div class="help-category">
                            <div class="category-header">
                                <div class="category-icon">📚</div>
                                <h3>Knowledge Base</h3>
                            </div>
                            <div class="help-options">
                                <div class="help-option">
                                    <h4>Getting Started Guide</h4>
                                    <p>Learn how to set up and use our platform</p>
                                    <button class="btn-outline">Read Guide</button>
                                </div>
                                <div class="help-option">
                                    <h4>Frequently Asked Questions</h4>
                                    <p>Find answers to common questions</p>
                                    <button class="btn-outline">View FAQ</button>
                                </div>
                                <div class="help-option">
                                    <h4>Tutorials & Videos</h4>
                                    <p>Watch step-by-step tutorials</p>
                                    <button class="btn-outline">Watch Now</button>
                                </div>
                            </div>
                        </div>

                        <div class="help-category">
                            <div class="category-header">
                                <div class="category-icon">🆘</div>
                                <h3>Support</h3>
                            </div>
                            <div class="help-options">
                                <div class="help-option">
                                    <h4>Contact Support Team</h4>
                                    <p>Get help from our support specialists</p>
                                    <button class="btn-primary">Contact Us</button>
                                </div>
                                <div class="help-option">
                                    <h4>Live Chat</h4>
                                    <p>Chat with us in real-time</p>
                                    <button class="btn-outline">Start Chat</button>
                                </div>
                                <div class="help-option">
                                    <h4>Email Support</h4>
                                    <p>Send us an email for assistance</p>
                                    <button class="btn-outline">Send Email</button>
                                </div>
                            </div>
                        </div>

                        <div class="contact-info">
                            <div class="category-header">
                                <div class="category-icon">📞</div>
                                <h3>Contact Information</h3>
                            </div>
                            <div class="contact-details">
                                <div class="contact-item">
                                    <span class="contact-label">Phone:</span>
                                    <span class="contact-value">+1 (555) 123-4567</span>
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label">Email:</span>
                                    <span class="contact-value">support@aegix.com</span>
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label">Business Hours:</span>
                                    <span class="contact-value">Mon-Fri 9:00 AM - 6:00 PM</span>
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label">Response Time:</span>
                                    <span class="contact-value">Within 24 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

{#if activeSection === "products"}
    <div class="right-sidebar">
        <div class="right-sidebar-header">
            <h3>Your Cart {#if cartItemCount > 0}({cartItemCount}){/if}</h3>
        </div>

        <div class="right-sidebar-content">
            {#if cartItems.length > 0}
                <div class="cart-items-list">
                    {#each cartItems as cartItem (cartItem.item.id)}
                        <div class="cart-item">
                            <img src={cartItem.item.image} alt={cartItem.item.name} class="cart-item-img" />

                            <div class="cart-item-details">
                                <div class="cart-top">
                                    <div class="cart-item-name">{cartItem.item.name}</div>
                                    <div class="cart-item-price">₱{cartItem.item.price.toLocaleString()} × {cartItem.quantity}</div>
                                </div>

                                <div class="cart-bottom">
                                    <div class="cart-item-quantity">
                                        <button class="quantity-btn" on:click={() => decreaseQuantity(cartItem.item.id)}>
                                            <i class="bx bx-minus"></i>
                                        </button>
                                        <span class="quantity-number">{cartItem.quantity}</span>
                                        <button class="quantity-btn" on:click={() => increaseQuantity(cartItem.item.id)}>
                                            <i class="bx bx-plus"></i>
                                        </button>
                                    </div>
                                    <button class="remove-btn" on:click={() => removeFromCart(cartItem.item.id)}>
                                        <i class="bx bx-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="cart-summary">
                    <h4>Order Summary</h4>
                    <p>Total Items: {cartItemCount}</p>
                    <p class="cart-total">Total: ₱{cartTotal.toLocaleString()}</p>
                </div>

                <div class="cart-actions">
                    <button class="checkout-btn" on:click={openCheckout}>
                        Checkout Now
                    </button>
                </div>
            {:else}
                <div class="empty-sidebar">
                    <p>Your cart is empty</p>
                    <small>Select a product and subitem to add to cart</small>
                </div>
            {/if}
        </div>
    </div>
{/if}

{#if showCheckoutModal}
<div class="checkout-modal-overlay" on:click={closeCheckoutModal}>
    <div class="checkout-modal" on:click|stopPropagation>
        <div class="checkout-header">
            <h2>Checkout</h2>
            <button class="close-checkout-btn" on:click={closeCheckoutModal}>×</button>
        </div>

        <div class="checkout-content">
            <!-- Order Items -->
            <div class="order-items-section">
                <h3>Current Sale</h3>
                <div class="order-items-list">
                    {#each cartItems as item}
                    <div class="order-item">
                        <span class="item-name">{item.item.name}</span>
                        <span class="item-quantity">{item.quantity}x</span>
                        <span class="item-price">₱{(item.item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    {/each}
                </div>
            </div>

            <!-- Order Summary -->
            <div class="order-summary-section">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>₱{cartTotal.toLocaleString()}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (3%)</span>
                    <span>₱{(cartTotal * 0.03).toLocaleString()}</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>₱{(cartTotal * 1.03).toLocaleString()}</span>
                </div>
            </div>

            <!-- Payment Method -->
            <div class="payment-method-section">
                <h3>Payment Method</h3>
                <div class="payment-options">
                    <button 
                        class:selected={paymentMethod === 'card'}
                        on:click={() => selectPaymentMethod('card')}
                    >
                        💳 Card
                    </button>
                    <button 
                        class:selected={paymentMethod === 'cash'}
                        on:click={() => selectPaymentMethod('cash')}
                    >
                        💵 Cash
                    </button>
                </div>
            </div>

            <!-- Cash Payment Details -->
            {#if paymentMethod === 'cash'}
            <div class="cash-payment-section">
                <div class="cash-input">
                    <label>Cash Amount:</label>
                    <input 
                        type="number" 
                        bind:value={cashAmount}
                        on:input={calculateChange}
                        placeholder="Enter cash amount"
                    />
                </div>
                {#if changeAmount > 0}
                <div class="change-amount">
                    Change: ₱{changeAmount.toLocaleString()}
                </div>
                {/if}
            </div>
            {/if}

            <!-- Action Buttons -->
            <div class="checkout-actions">
                <button class="cancel-btn" on:click={closeCheckoutModal}>
                    Cancel
                </button>
                <button 
                    class="confirm-payment-btn" 
                    on:click={processPayment}
                    disabled={!paymentMethod || (paymentMethod === 'cash' && cashAmount < (cartTotal * 1.08))}
                >
                    Confirm Payment
                </button>
            </div>
        </div>
    </div>
</div>
{/if}

{#if showSuccessModal && transactionDetails}
<div class="success-modal-overlay">
    <div class="success-modal">
        <div class="success-modal-content">
            <!-- Header -->
            <div class="receipt-header">
                <h1>Payment Successful</h1>
                <p>Thank you for your purchase!</p>
            </div>

            <!-- Store Info -->
            <div class="store-info">
                <h2>Aegix</h2>
                <p>{transactionDetails.date}, {transactionDetails.time}</p>
            </div>

            <div class="divider"></div>

            <!-- Order Items -->
            <div class="receipt-items">
                {#each transactionDetails.items as item}
                <div class="receipt-item">
                    <div class="item-main">
                        <span class="item-name">{item.item.name}</span>
                        <span class="item-price">₱{(item.item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    <div class="item-details">
                        <span>{item.quantity} x ₱{item.item.price.toLocaleString()}</span>
                    </div>
                </div>
                {/each}
            </div>

            <div class="divider"></div>

            <!-- Order Summary -->
            <div class="receipt-summary">
                <div class="summary-line">
                    <span>Subtotal:</span>
                    <span>₱{transactionDetails.subtotal.toLocaleString()}</span>
                </div>
                <div class="summary-line">
                    <span>Tax:</span>
                    <span>₱{transactionDetails.tax.toLocaleString()}</span>
                </div>
                <div class="summary-line total">
                    <span>TOTAL:</span>
                    <span>₱{transactionDetails.total.toLocaleString()}</span>
                </div>
            </div>

            <!-- Payment Details -->
            <div class="payment-details">
                <p>Paid with: {transactionDetails.paymentMethod === 'card' ? 'Card' : 'Cash'}</p>
                <p>Transaction ID: {transactionDetails.id}</p>
                {#if transactionDetails.paymentMethod === 'cash' && transactionDetails.change > 0}
                <p>Change: ₱{transactionDetails.change.toLocaleString()}</p>
                {/if}
            </div>

            <!-- Action Buttons -->
            <div class="success-actions">
                <button class="print-btn" on:click={printReceipt}>
                    Print Receipt
                </button>
                <button class="new-sale-btn" on:click={startNewSale}>
                    New Sale
                </button>
            </div>
        </div>
    </div>
</div>
{/if}

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<style>
    .main-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: #f2f2f2;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        padding: 20px;
        z-index: 999;
    }

    .sidebar-container {
        position: fixed;
        top: 30px;
        left: 15px;
        z-index: 1000;
    }

    .sidebar {
        position: fixed;
        top: 30px;
        left: 15px;
        width: 168px;
        height: 93vh;
        background: white;
        font-family: Inter, sans-serif;
        border-radius: 20px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 15px;
        overflow: hidden;
        z-index: 1000;
    }

    .sidebar .logo {
        margin-top: -5px;
        margin-left: -65px;
        width: 45px;
        display: flex;
        align-items: center;
        gap: 8px;
        border: none;
        cursor: pointer;
        margin-bottom: 0;
    }

    .sidebar .img-wrapper {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sidebar .img-wrapper img {
        width: 50px;
        height: 300%;
        object-fit: contain;
    }

    .sidebar .text {
        margin-top: -60px;
        margin-left: 45px;
        width: 60px;
        display: flex;
        align-items: center;
        gap: 8px;
        border: none;
        cursor: pointer;
        margin-bottom: 0;
    }

    .sidebar .text-wrapper {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sidebar .text-wrapper span {
        font-size: 20px;
        font-weight: 600;
        color: #3B5AFE;
        letter-spacing: 0.5px;
    }

    .section-title {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 1px;
        color: #666;
        margin: 15px 0 10px;
        width: calc(100% - 40px);
        text-align: left;
        padding-left: 5px;
    }

    .nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 14px;
    margin: 4px 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: black;
    width: calc(100% - 40px);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
}

    .nav-item i {
        font-size: 20px;
        width: 26px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav-item:hover {
        background: #3B5AFE;
        color: white;
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(59, 90, 254, 0.3);
    }


    .nav-item.active {
        background: #3B5AFE;
        color: white;
        transform: translateX(4px) scale(0.98);
        box-shadow: 0 4px 20px rgba(59, 90, 254, 0.4);
    }

    .register-section {
        margin-top: -15px;
        padding: 15px 20px;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .register-btn, .logout-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: calc(100% - 20px);
        background: #3B5AFE;
        color: white;
        border: none;
        border-radius: 25px;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.2s ease;
    }

    .logout-btn {
        background: #dc3545;
        margin-left: -15px;
        height: 30px;
        width: 100px;
    }
    .register-btn:hover {
        background: #2E47E6;
    }

    .logout-btn:hover {
        background: transparent;
        border: 1px solid #dc3545;
        color: #dc3545;
        font-weight: 20px;
    }

    .user-welcome {
         display: flex;
        align-items: center;
        gap: -5px; 
        color: #3B5AFE;
        font-weight: 600;
        font-size: 14px;
        padding: 10px 15px;
    }

    .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.modal-content {
    background: white;
    border-radius: 16px;
    width: 900px; /* Binawasan ang lapad mula sa 100px */
    max-width: 90vw; /* Para hindi lumampas sa screen sa mobile */
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-40px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 28px 20px;
    border-bottom: 1px solid #f0f0f0;
    background: white;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
    letter-spacing: -0.5px;
}

.close-btn {
    background: #f8fafc;
    border: none;
    font-size: 22px;
    cursor: pointer;
    color: #64748b;
    padding: 6px;
    border-radius: 50%;
    transition: all 0.3s ease;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn:hover {
    background: #3B5AFE;
    color: white;
    transform: rotate(90deg);
}

.container {
    padding: 28px;
}

.input-group {
    margin-bottom: 8px;
}

.input-wrapper {
    position: relative;
    margin-bottom: 20px;
}

.icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    font-size: 18px;
    transition: color 0.3s ease;
}

input {
    width: 100%;
    padding: 14px 16px 14px 48px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 15px;
    box-sizing: border-box;
    outline: none;
    transition: all 0.3s ease;
    background: #ffffff;
    font-weight: 400;
    color: #1a1a1a;
}

input:focus {
    border-color: #3B5AFE;
    box-shadow: 0 0 0 3px rgba(59, 90, 254, 0.1);
    background: #ffffff;
}

input::placeholder {
    color: #94a3b8;
    font-weight: 400;
}

.submit-btn {
    width: 100%;
    background: linear-gradient(135deg, #3B5AFE 0%, #2E47E6 100%);
    color: white;
    border: none;
    padding: 14px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
    text-transform: none;
    margin-top: 8px;
    box-shadow: 0 4px 12px rgba(59, 90, 254, 0.2);
}

.submit-btn:hover {
    background: linear-gradient(135deg, #2E47E6 0%, #1e3a8a 100%);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(59, 90, 254, 0.3);
}

.submit-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(59, 90, 254, 0.3);
}

    .main-container {
        position: fixed;
        top: 30px;
        right: 15px;
        left: 200px;
        height: 93vh;
        width: 500;
        background: white;
        font-family: Inter, sans-serif;
        border-radius: 20px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        overflow: auto;
        z-index: 999;
    }

    .main-content {
        padding: 30px;
        height: 100%;
        overflow-y: auto;
        min-height: calc(100% - 60px);
    }

    .main-content1 { background: white; }
    .main-content2 { background: white; }
    .main-content3 { background: white; }
    .main-content4 { background: white; }
    .main-content5 { background: white; }

    /* ========== DASHBOARD STYLES ========== */
.dashboard-container {
    padding: 20px;
    max-height: calc(100vh - 80px);
    overflow-y: auto;
}

/* Stats Grid */
.dashboard-container .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.dashboard-container .stat-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    border: 1px solid #e1e5e9;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-container .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.dashboard-container .stat-icon {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;
}

.dashboard-container .stat-card:nth-child(2) .stat-icon {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.dashboard-container .stat-card:nth-child(3) .stat-icon {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.dashboard-container .stat-card:nth-child(4) .stat-icon {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.dashboard-container .stat-info h3 {
    margin: 0 0 5px 0;
    font-size: 14px;
    color: #6c757d;
    font-weight: 500;
}

.dashboard-container .stat-value {
    font-size: 24px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 5px 0;
}

.dashboard-container .stat-change {
    font-size: 12px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 12px;
}

.dashboard-container .stat-change.positive {
    background: #d4edda;
    color: #155724;
}

/* Charts Grid */
.dashboard-container .charts-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

.dashboard-container .chart-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    border: 1px solid #e1e5e9;
}

.dashboard-container .chart-card h3 {
    margin: 0 0 15px 0;
    font-size: 16px;
    color: #2c3e50;
    font-weight: 600;
}

.dashboard-container .chart-placeholder {
    height: 200px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    font-size: 16px;
    border: 2px dashed #dee2e6;
}

/* Activity Card */
.dashboard-container .activity-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    border: 1px solid #e1e5e9;
    margin-bottom: 30px;
}

.dashboard-container .activity-card h3 {
    margin: 0 0 20px 0;
    font-size: 16px;
    color: #2c3e50;
    font-weight: 600;
}

.dashboard-container .activity-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.dashboard-container .activity-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 0;
    border-bottom: 1px solid #f1f3f4;
}

.dashboard-container .activity-item:last-child {
    border-bottom: none;
}

.dashboard-container .activity-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
}

.dashboard-container .activity-details {
    flex: 1;
}

.dashboard-container .activity-details p {
    margin: 0 0 4px 0;
    font-size: 14px;
    color: #2c3e50;
    font-weight: 500;
}

.dashboard-container .activity-details small {
    color: #6c757d;
    font-size: 12px;
}

.dashboard-container .activity-amount {
    font-weight: 600;
    color: #28a745;
}

/* Quick Actions */
.dashboard-container .quick-actions {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    border: 1px solid #e1e5e9;
}

.dashboard-container .quick-actions h3 {
    margin: 0 0 20px 0;
    font-size: 16px;
    color: #2c3e50;
    font-weight: 600;
}

.dashboard-container .action-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
}

.dashboard-container .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px 15px;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 10px;
    color: #6c757d;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
}

.dashboard-container .action-btn:hover {
    background: #e9ecef;
    border-color: #667eea;
    color: #667eea;
    transform: translateY(-2px);
}

.dashboard-container .action-btn span {
    font-size: 20px;
}

/* Animation for dashboard elements */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dashboard-container .stat-card {
    animation: fadeInUp 0.5s ease forwards;
}

.dashboard-container .stat-card:nth-child(1) { animation-delay: 0.1s; }
.dashboard-container .stat-card:nth-child(2) { animation-delay: 0.2s; }
.dashboard-container .stat-card:nth-child(3) { animation-delay: 0.3s; }
.dashboard-container .stat-card:nth-child(4) { animation-delay: 0.4s; }

.dashboard-container .chart-card {
    animation: fadeInUp 0.5s ease 0.5s forwards;
    opacity: 0;
}

.dashboard-container .activity-card {
    animation: fadeInUp 0.5s ease 0.6s forwards;
    opacity: 0;
}

.dashboard-container .quick-actions {
    animation: fadeInUp 0.5s ease 0.7s forwards;
    opacity: 0;
}

/* Responsive Design for Dashboard Only */
@media (max-width: 1024px) {
    .dashboard-container .charts-grid {
        grid-template-columns: 1fr;
    }
    
    .dashboard-container .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .dashboard-container {
        padding: 15px;
    }
    
    .dashboard-container .stats-grid {
        grid-template-columns: 1fr;
    }
    
    .dashboard-container .action-buttons {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .dashboard-container .action-buttons {
        grid-template-columns: 1fr;
    }
    
    .dashboard-container .stat-card {
        flex-direction: column;
        text-align: center;
        gap: 10px;
    }
    
    .dashboard-container .stat-info {
        width: 100%;
    }
}

/* ========== REPORT STYLES ========== */
.analytics-dashboard {
    position: relative;
    margin-top: -40px;
    margin-left: -40px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-family: "Inter", sans-serif;
}

.analytics-dashboard .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto auto;
    gap: 2rem;
}

.analytics-dashboard .card1.blue { 
    grid-column: 1; 
    grid-row: 1; 
    background: linear-gradient(135deg, #4c62f0, #3B5AFE); 
    color: white; 
    height: 25vh; 
    width: 300px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
}

.analytics-dashboard .card1.blue::before {
    content: '$'; 
    position: absolute;
    top: 20px;
    left: 20px;
    width: 50px; 
    height: 50px;
    background-color: rgb(236, 236, 236);
    border-radius: 12px;  
}

.analytics-dashboard .card-header1 { 
    display: flex; 
    align-items: flex-start; 
    justify-content: flex-end;
    margin-bottom: 50px; 
}

.analytics-dashboard .card-header1 h2 { 
    font-size: 12px; 
    font-weight: 500; 
    position: absolute;
    top: 130px;
    left: 20px;
    margin: 0;
}

.analytics-dashboard .positive1 { 
    background: #a7f3d0; 
    color: #047857; 
    padding: 1.5px 10px; 
    border-radius: 9999px; 
    font-size: 0.8rem; 
    font-weight: 700; 
    position: absolute;
    top: 30px; 
    right: 30px;
}

.analytics-dashboard .value1 { 
    font-size: 1.5rem; 
    font-weight: 700; 
    margin: 0; 
    position: absolute;
    bottom: 8px; 
    left: 20px;
}

.analytics-dashboard .desc1 { 
    position: absolute;
    font-size: 10px; 
    opacity: 1; 
    line-height: 1.2;
    bottom: 20px;
    font-weight: 2;
    display: inline-block;
    vertical-align: top;
    margin-left: 130px;
    max-width: 25%; 
}

.analytics-dashboard .card2 { 
    grid-column: 2; 
    grid-row: 1; 
    border-radius: 1.25rem; 
    padding: 1rem; 
    height: 25vh; 
    width: 300px;
    margin-left: -3rem;
    background: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06); 
    transition: transform 0.2s ease, box-shadow 0.2s ease; 
}

.analytics-dashboard .card2:hover { 
    transform: translateY(-4px); 
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08); 
}

.analytics-dashboard .card-header2 { 
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    margin-bottom: 0.75rem; 
}

.analytics-dashboard .card-header2 h2 { font-size: 1rem; font-weight: 600; }
.analytics-dashboard .positive2 { 
    background: #a7f3d0; 
    color: #047857; 
    padding: 4px 8px; 
    border-radius: 9999px; 
    font-size: 0.75rem; 
    font-weight: 600; 
}
.analytics-dashboard .value2 { font-size: 2rem; font-weight: 700; margin: 0.25rem 0; }
.analytics-dashboard .desc2 { font-size: 0.875rem; opacity: 0.85; }

.analytics-dashboard .card3 { 
    grid-column: 1; 
    grid-row: 2; 
    border-radius: 1.25rem;
    padding: 1.5rem;
    margin-top: -18px; 
    height: 25vh; 
    width: 300px;
    background: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.analytics-dashboard .card3:hover { 
    transform: translateY(-4px); 
    box-shadow: 0 6px 14px rgba(0,0,0,0.08); 
}
.analytics-dashboard .card-header3 { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
.analytics-dashboard .card-header3 h2 { font-size: 1rem; font-weight: 600; }
.analytics-dashboard .negative3 { background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
.analytics-dashboard .value3 { font-size: 2rem; font-weight: 700; margin: 0.25rem 0; }
.analytics-dashboard .desc3 { font-size: 0.875rem; opacity: 0.85; }

.analytics-dashboard .card4 { 
    grid-column: 2; 
    grid-row: 2; 
    border-radius: 1.25rem;
    padding: 1.5rem;
    height: 25vh; 
    margin-top: -18px;
    width: 300px; 
    margin-left: -3rem;
    background: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.analytics-dashboard .card4:hover { transform: translateY(-4px); box-shadow: 0 6px 14px rgba(0,0,0,0.08); }
.analytics-dashboard .card-header4 { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
.analytics-dashboard .card-header4 h2 { font-size: 1rem; font-weight: 600; }
.analytics-dashboard .positive4 { background: #a7f3d0; color: #047857; padding: 4px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
.analytics-dashboard .value4 { font-size: 2rem; font-weight: 700; margin: 0.25rem 0; }
.analytics-dashboard .desc4 { font-size: 0.875rem; opacity: 0.85; }

.analytics-dashboard .card5 {
    grid-column: 3;
    grid-row: 1 / span 3;
    align-self: end;
    margin-bottom: 470px;
    border-radius: 1.25rem;
    padding: 1.3rem;
    height: 400px;
    background: white;
    margin-left: -6rem;
    margin-right: -1rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.02);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.analytics-dashboard .card5:hover { transform: translateY(-4px); box-shadow: 0 6px 14px rgba(0,0,0,0.08); }
.analytics-dashboard .card-header5 { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
.analytics-dashboard .card-header5 h2 { font-size: 1rem; font-weight: 600; }
.analytics-dashboard .muted5 { color: black; font-size: 0.8rem; font-weight: 500; }
.analytics-dashboard .stat-body { display: flex; flex-direction: column; gap: 0.75rem; }
.analytics-dashboard .stat-body .value5 { font-size: 1.8rem; font-weight: 700; color: black; }
.analytics-dashboard .stat-body ul { list-style: none; padding: 0; margin-top: 0.5rem; }
.analytics-dashboard .stat-body li { display: flex; justify-content: space-between; padding: 0.4rem 0; font-size: 0.9rem; color: #374151; }
.analytics-dashboard .stat-body li span.positive6 { color: #16a34a; }
.analytics-dashboard .stat-body li span.positive7 { color: #16a34a; }
.analytics-dashboard .stat-body li span.negative5 { color: #dc2626; }

.analytics-dashboard .card6 { 
    grid-column: 2; 
    grid-row: 3; 
    justify-self: center; 
    border-radius: 1.25rem; 
    padding: 1.5rem; 
    margin-left: -29rem;
    width: 625px;
    height: 450px; 
    margin-top: -10px;
    margin-right: 2rem;
    background: #ffffff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.06); 
    transition: transform 0.2s ease, box-shadow 0.2s ease; 
}
.analytics-dashboard .card6:hover { transform: translateY(-4px); box-shadow: 0 6px 14px rgba(0,0,0,0.08); }
.analytics-dashboard .card-header6 { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
.analytics-dashboard .card-header6 h2 { font-size: 1rem; font-weight: 600; }
.analytics-dashboard .muted6 { color: black; font-size: 0.8rem; font-weight: 500; }
.analytics-dashboard .chart-placeholder6 {
    height: 160px; 
    background: repeating-linear-gradient(45deg, #f3f4f6, #f3f4f6 10px, #e5e7eb 10px, #e5e7eb 20px);
    display: flex; align-items: center; justify-content: center; 
    color: black; border-radius: 12px; font-size: 0.9rem;
}

.analytics-dashboard .card7 { 
    gap: 10%;
    margin-right: -10px;
    grid-column: 3; 
    grid-row: 3; 
    border-radius: 1.25rem; 
    padding: 1.5rem; 
    margin-left: -90px; /* Binago mula sa margin-right: 20px; */
    background: #fff; 
    box-shadow: 0 4px 10px rgba(0,0,0,0.06); 
    transition: transform 0.2s ease, box-shadow 0.2s ease; 
}
.analytics-dashboard .card7:hover { transform: translateY(-4px); box-shadow: 0 6px 14px rgba(0,0,0,0.08); }
.analytics-dashboard .card-header7 { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
.analytics-dashboard .card-header7 h2 { font-size: 1rem; font-weight: 600; }
.analytics-dashboard .muted7 { color: black; font-size: 0.8rem; font-weight: 500; }
.analytics-dashboard .growth-list7 { list-style: none; padding: 0; margin-top: 1rem; }
.analytics-dashboard .growth-list7 li { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; font-size: 0.9rem; color: #374151; }
.analytics-dashboard .growth-list7 li:last-child { border-bottom: none; }

    /* ========== PRODUCTS STYLES ========== */
    .main-category-tabs {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e0e0e0;
        position: relative;
    }

    .main-category-tabs button {
        padding: 12px 24px;
        border: 2px solid #3B5AFE;
        background: white;
        color: #3B5AFE;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
    }

    .main-category-tabs button:hover {
        background: #3B5AFE;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(59, 90, 254, 0.3);
    }

    .main-category-tabs button.selected {
        background: #3B5AFE;
        color: white;
        box-shadow: 0 4px 20px rgba(59, 90, 254, 0.4);
        transform: translateY(-2px);
    }

    .selected-product-indicator {
        background: linear-gradient(135deg, #3B5AFE, #2E47E6);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(59, 90, 254, 0.3);
        animation: slideIn 0.3s ease;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 8px;
        position: absolute;
        right: 20px;
        top: 0;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .gender-tabs-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        gap: 20px;
    }

    .tabs-section {
        display: flex;
        flex: 1;
    }

    .main-tabs {
        display: flex;
        align-items: center;
        gap: 20px;
        flex: 1;
    }

    .gender-tabs {
        display: flex;
        gap: 10px;
    }

    .kids-tabs {
        display: flex;
        gap: 15px;
        padding-left: 40px;
    }

    .gender-tabs button,
    .kids-tabs button {
        padding: 8px 20px;
        color: #3B5AFE;
        border: 2px solid #3B5AFE;
        background: white;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
    }

    .gender-tabs button.selected,
    .kids-tabs button.selected {
        background: #3B5AFE;
        color: white;
        box-shadow: 0 4px 20px rgba(59, 90, 254, 0.4);
    }

    .search-bar-container {
        display: flex;
        align-items: center;
        gap: 10px;
        background: transparent;
        padding: 3px 15px;
        border: 2px solid #3B5AFE;
        border-radius: 25px;
        transition: all 0.3s ease;
        width: 280px;
        flex-shrink: 0;
    }

    .search-bar-container:focus-within {
        border-color: #3B5AFE;
        box-shadow: 0 0 0 3px rgba(59, 90, 254, 0.1);
    }

    .search-bar-container i {
        color: #3B5AFE;
        font-size: 20px;
    }

    .search-bar {
        outline: none;
        border: none;
        width: 100%;
    }

    .search-bar:focus {
        outline: none;
        border: none;
        box-shadow: none;
    }

    .product-item {
        background: #f0f0f0;
        margin-top: 10px;
        text-align: center;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        width: 200px;
        height: 240px;
        border-radius: 20px;
    }

    .product-image-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        padding: 10px;
        background: white;
        width: 190px;
        margin-top: 5px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 20px;
    }

    .product-image-container img {
        max-width: 100%;
        max-height: 120px;
        object-fit: contain;
    }

    .product-name {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
        color: black;
        margin-left: 10px;
        width: 110px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        text-transform: capitalize;
        transition: all 0.3s ease;
    }

    /* Category-specific colors using data attributes */
    .product-name[data-category*="pants"],
    .product-name[data-category*="shorts"],
    .product-name[data-category*="shirts"],
    .product-name[data-category*="shirt"],
    .product-name[data-category*="formal"],
    .product-name[data-category*="jackets"],
    .product-name[data-category*="polo"],
    .product-name[data-category*="tops"],
    .product-name[data-category*="dress"],
    .product-name[data-category*="skirts"],
    .product-name[data-category*="shoes"],
    .product-name[data-category*="sleepers"],
    .product-name[data-category*="heels"],
    .product-name[data-category*="sandals"],
    .product-name[data-category*="boots"],
    .product-name[data-category*="necklace"],
    .product-name[data-category*="bracelets"],
    .product-name[data-category*="earings"],
    .product-name[data-category*="watch"] {
        color: #3B5AFE;
        font-weight: 700;
        font-size: 16px;
        margin-left: 45px;
    }

    .product-count {
        color: black;
        font-size: 12px;
        font-weight: 500;
        padding: 2px 8px;
        border-radius: 12px;
        display: inline-block;
        margin-top: 3px;
    }

    .product-item:hover .product-name {
        transform: translateY(-2px);
    }

    /* Subitems Grid Styles */
    .subitem-item {
    background: #f0f0f0;
    margin-top: 10px;
    text-align: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 280px;
    border-radius: 20px;
    box-sizing: border-box; /* important */
    transition: transform 0.2s; /* smooth hover effect */
}

/* Optional: smooth hover effect without shifting */
.subitem-item:hover {
    transform: scale(1.05); /* slight zoom effect */
}


    .subitem-image-container {
        flex: 1;
        display: flex;
        border-radius: 20px;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        padding: 10px;
        background: white;
        width: 190px; 
        margin-top: 5px;
        margin-left: auto; 
        margin-right: auto; 
    }

    .subitem-image-container img {
        max-width: 100px;
        max-height: 120px;
        object-fit: contain;
    }

    .subitem-name {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 5px;
        color: black;
        margin-left: 20px;
        text-transform: capitalize;
        transition: all 0.3s ease;
    }

    .subitem-price {
        font-size: 13px;
        font-weight: 700;
        color: #059669;
        margin: 0;
        margin-left: 5px !important;
        transition: all 0.3s ease;
    }

    /* Subitem name colors based on parent category */
    .subitem-info[data-parent-category*="pants"] .subitem-name,
    .subitem-info[data-parent-category*="shorts"] .subitem-name,
    .subitem-info[data-parent-category*="shirts"] .subitem-name,
    .subitem-info[data-parent-category*="shirt"] .subitem-name,
    .subitem-info[data-parent-category*="formal"] .subitem-name,
    .subitem-info[data-parent-category*="jackets"] .subitem-name,
    .subitem-info[data-parent-category*="polo"] .subitem-name,
    .subitem-info[data-parent-category*="tops"] .subitem-name,
    .subitem-info[data-parent-category*="dress"] .subitem-name,
    .subitem-info[data-parent-category*="skirts"] .subitem-name,
    .subitem-info[data-parent-category*="shoes"] .subitem-name,
    .subitem-info[data-parent-category*="formal shoes"] .subitem-name,
    .subitem-info[data-parent-category*="sleepers"] .subitem-name,
    .subitem-info[data-parent-category*="heels"] .subitem-name,
    .subitem-info[data-parent-category*="sandals"] .subitem-name,
    .subitem-info[data-parent-category*="boots"] .subitem-name,
    .subitem-info[data-parent-category*="necklace"] .subitem-name,
    .subitem-info[data-parent-category*="bracelets"] .subitem-name,
    .subitem-info[data-parent-category*="earings"] .subitem-name,
    .subitem-info[data-parent-category*="watch"] .subitem-name {
        color: #3B5AFE;
        font-weight: 700;
        font-size: 16px;
        margin-left: 10px;
    }

    /* Enhanced price styling */
    .subitem-price {
        font-size: 14px;
        font-weight: 700;
        color: black;
        margin: 0;
        margin-left: 15px;
        background: black;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: inline-block;
        padding: 2px 0;
    }

    .subitem-action {
        margin-top: auto;
    }

    /* Grid Layouts */
    .product-grid,
    .subitems-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }

    /* Back Button */
    .back-button {
        background: #3B5AFE;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 600;
    }

    .back-button:hover {
        background: #2a4ae0;
    }

    /* No Products Message */
    .no-products-message {
        text-align: center;
        padding: 40px;
        color: #666;
        font-size: 18px;
    }

    .cart-toggle-btn {
        width: 100%;
        padding: 10px 15px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    /* ADD TO CART */
    .add-cart-btn {
        margin-left: -0px;
        width: 200px !important;
        padding: 8px 20px !important;
        background: #f0f0f0 !important;
        color: #f0f0f0;
        font-size: 100%;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        transition: all 0.3s ease-in-out; 
    }

    .add-cart-btn:hover {
        margin-left: -0px;
        width: 200px !important;
        padding: 8px 20px !important;
        background: #3B5AFE !important;
        color: white;
        font-size: 100%;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        transform: translateY(-1px); 
        box-shadow: 0 4px 12px rgba(59, 90, 254, 0.3);
    }

    /* ========== RIGHT SIDEBAR STYLES ========== */
    .right-sidebar {
        position: fixed;
        top: 30px;
        right: 15px;
        width: 300px;
        height: 93vh;
        background: white;
        font-family: Inter, sans-serif;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        padding: 0;
        z-index: 999;
        overflow: hidden;
    }

    .right-sidebar-header {
        padding: 20px 20px 15px 20px;
        border-bottom: 1px solid white;
        background: white;
    }

    .right-sidebar-header h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: black;
        margin: 0;
    }

    .right-sidebar-content {
        flex: 1;
        padding: 20px;
        overflow-y: hidden;
    }

    /* Cart Preview Styles */
    .cart-preview {
        text-align: center;
        padding: 15px 0;
        border-bottom: 1px solid white;
        margin-bottom: 20px;
    }

    .cart-preview-img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 12px;
        margin-bottom: 15px;
        border: 2px solid white;
    }

    .cart-item-name {
        font-size: 1.1rem;
        font-weight: 600;
        color: black;
        margin: 0 0 8px 0;
    }

    .cart-item-price {
        font-size: 1.3rem;
        font-weight: 700;
        color: #3B5AFE;
        margin: 0;
    }

    /* Cart Items List Styles */
    .cart-items-list {
        max-height: 400px;
        overflow-y: auto;
        margin-bottom: 20px;
    }

    .cart-item {
        display: flex;
        align-items: center;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 12px;
        margin-bottom: 12px;
        border: 1px solid #e5e7eb;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .cart-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .cart-item-img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 15px;
        border: 2px solid #e5e7eb;
    }

    .cart-item-details {
        flex: 1;
    }

    .cart-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 10px;
    }

    .cart-item-name {
        font-size: 0.95rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0;
        flex: 1;
    }

    .cart-item-price {
        font-size: 0.9rem;
        font-weight: 700;
        color: #3B5AFE;
        margin: 0;
    }

    .cart-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .quantity-btn {
        width: 28px;
        height: 28px;
        border: 1px solid #d1d5db;
        background: white;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .quantity-btn:hover {
        background: #3B5AFE;
        color: white;
        border-color: #3B5AFE;
    }

    .quantity-btn i {
        font-size: 14px;
    }

    .quantity-number {
        font-weight: 600;
        color: #374151;
        min-width: 20px;
        text-align: center;
    }

    .remove-btn {
        width: 32px;
        height: 32px;
        border: none;
        background: #ef4444;
        color: white;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .remove-btn:hover {
        background: none;
        color: #ef4444;
        border: 2px solid #ef4444;
    }

    .remove-btn i {
        font-size: 16px;
    }

    /* Cart Summary Styles */
    .cart-summary {
        border-top: 2px solid white;
        padding: 15px;
        background: white;
        border-radius: 20px;
        position: fixed;
        width: 250px;
        bottom: 100px; /* Space for checkout button */
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    }


    .cart-summary h4 {
        font-size: 1.1rem;
        font-weight: 600;
        color: black;
        margin: 0 0 15px 0;
    }

    .cart-summary p {
        margin: 5px 0;
        color: black;
        font-size: 15px;
    }

    .cart-total {
        font-size: 15px !important;
        font-weight: 700 !important;
        color: black !important;
        margin-top: 15px !important;
    }

    .cart-actions {
    position: fixed;
    bottom: 35px;
    width: 300px;
    text-align: center;
}

.checkout-btn {
    width: 80%;
    height: 45px;
    background: #3B5AFE;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 auto;
    display: block;
}

.checkout-btn:hover {
    background: #2E47E6;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 90, 254, 0.4);
}

    /* Empty Sidebar Styles */
    .empty-sidebar {
        text-align: center;
        padding: 40px 20px;
        color: #6b7280;
    }

    .empty-sidebar p {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 8px 0;
    }

    .empty-sidebar small {
        font-size: 0.9rem;
        color: #9ca3af;
    }

    /* Scrollbar Styling */
    .right-sidebar-content::-webkit-scrollbar {
        width: 6px;
    }

    .right-sidebar-content::-webkit-scrollbar-track {
        background: #042547;
        border-radius: 3px;
    }

    .right-sidebar-content::-webkit-scrollbar-thumb {
        background: #042547;
        border-radius: 3px;
    }

    .right-sidebar-content::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }

    /* Ensure main-content3 has proper spacing */
    .main-content3 {
        padding-right: 340px !important;
        transition: padding-right 0.3s ease;
    }

    @media (max-width: 1024px) {
        .main-content3 {
            padding-right: 300px !important;
        }
    }

    @media (max-width: 768px) {
        .main-content3 {
            padding-right: 20px !important;
        }
    }

    /* ========== CHECKOUT MODAL STYLES ========== */
    .checkout-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }

    .checkout-modal {
        background: white;
        border-radius: 20px;
        padding: 30px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: modalSlideIn 0.3s ease-out;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .checkout-modal::-webkit-scrollbar {
        display: none;
        width: 0;
        background: transparent;
    }

    .checkout-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 2px solid #f0f0f0;
    }

    .checkout-header h2 {
        margin: 0;
        color: #1f2937;
        font-size: 1.5rem;
        font-weight: 700;
    }

    .close-checkout-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
        padding: 5px;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }

    .close-checkout-btn:hover {
        background: #f3f4f6;
        color: #374151;
    }

    .checkout-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .order-items-section h3,
    .payment-method-section h3 {
        margin: 0 0 15px 0;
        color: #374151;
        font-size: 1.1rem;
        font-weight: 600;
    }

    .order-items-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 200px;
        overflow-y: auto;
        padding: 10px;
        background: #f8fafc;
        border-radius: 10px;
    }

    .order-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: white;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
    }

    .item-name {
        flex: 1;
        font-weight: 500;
        color: #374151;
    }

    .item-quantity {
        color: #6b7280;
        margin: 0 10px;
    }

    .item-price {
        font-weight: 600;
        color: #059669;
    }

    .order-summary-section {
        background: #f8fafc;
        padding: 20px;
        border-radius: 10px;
    }

    .summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .summary-row.total {
        border-top: 2px solid #e5e7eb;
        padding-top: 10px;
        margin-top: 10px;
        font-weight: 700;
        font-size: 1.1rem;
        color: #1f2937;
    }

    .payment-options {
        display: flex;
        gap: 15px;
    }

    .payment-options button {
        flex: 1;
        padding: 15px 20px;
        border: 2px solid #e5e7eb;
        background: white;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .payment-options button:hover {
        border-color: #3B5AFE;
        transform: translateY(-2px);
    }

    .payment-options button.selected {
        border-color: #3B5AFE;
        background: #3B5AFE;
        color: white;
        box-shadow: 0 4px 15px rgba(59, 90, 254, 0.3);
    }

    .cash-payment-section {
        background: #f8fafc;
        padding: 20px;
        border-radius: 10px;
    }

    .cash-input {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .cash-input label {
        font-weight: 600;
        color: #374151;
    }

    .cash-input input {
        padding: 12px 15px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s ease;
    }

    .cash-input input:focus {
        border-color: #3B5AFE;
    }

    .change-amount {
        margin-top: 10px;
        padding: 10px;
        background: #dcfce7;
        color: #166534;
        border-radius: 8px;
        font-weight: 600;
        text-align: center;
    }

    .checkout-actions {
        display: flex;
        gap: 15px;
        margin-top: 20px;
    }

    .cancel-btn {
        flex: 1;
        padding: 15px;
        border: 2px solid #e5e7eb;
        background: white;
        color: #374151;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .cancel-btn:hover {
        background: #f3f4f6;
        border-color: #d1d5db;
    }

    .confirm-payment-btn {
        flex: 2;
        padding: 15px;
        border: none;
        background: #3B5AFE;
        color: white;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .confirm-payment-btn:hover:not(:disabled) {
        background: #2E47E6;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(59, 90, 254, 0.4);
    }

    .confirm-payment-btn:disabled {
        background: #9ca3af;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    /* ========== SUCCESS MODAL STYLES ========== */
    .success-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(2px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
    }

    .success-modal {
        background: white;
        border-radius: 20px;
        padding: 0;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        animation: successModalSlideIn 0.4s ease-out;
    }

    .success-modal-content {
        padding: 30px 25px;
        text-align: center;
        max-height: 85vh;
        overflow-y: auto;
    }

    /* Hide scrollbar for success modal content */
    .success-modal-content::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }

    .success-modal-content {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .receipt-header {
        margin-bottom: 20px;
    }

    .receipt-header h1 {
        color: #059669;
        font-size: 1.8rem;
        font-weight: 700;
        margin: 0 0 10px 0;
    }

    .receipt-header p {
        color: #6b7280;
        font-size: 1rem;
        margin: 0;
    }

    .store-info {
        margin: 20px 0;
        padding: 15px;
        background: #f8fafc;
        border-radius: 10px;
    }

    .store-info h2 {
        color: #1f2937;
        font-size: 1.3rem;
        font-weight: 700;
        margin: 0 0 8px 0;
    }

    .store-info p {
        color: #6b7280;
        font-size: 0.9rem;
        margin: 4px 0;
    }

    .divider {
        height: 1px;
        background: linear-gradient(to right, transparent, #e5e7eb, transparent);
        margin: 20px 0;
    }

    .receipt-items {
        margin: 20px 0;
    }

    .receipt-item {
        margin: 15px 0;
        text-align: left;
    }

    .item-main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 5px;
    }

    .item-name {
        font-weight: 600;
        color: #1f2937;
        font-size: 1rem;
        flex: 1;
        margin-right: 10px;
    }

    .item-price {
        font-weight: 700;
        color: #059669;
        font-size: 1rem;
    }

    .item-details {
        color: #6b7280;
        font-size: 0.85rem;
        text-align: right;
    }

    .receipt-summary {
        text-align: left;
        margin: 20px 0;
    }

    .summary-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0;
        font-size: 0.95rem;
    }

    .summary-line.total {
        border-top: 2px solid #e5e7eb;
        padding-top: 12px;
        margin-top: 12px;
        font-weight: 700;
        font-size: 1.1rem;
        color: #1f2937;
    }

    .payment-details {
        background: #f8fafc;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        text-align: left;
    }

    .payment-details p {
        margin: 8px 0;
        color: #374151;
        font-size: 0.9rem;
    }

    .payment-details p:first-child {
        font-weight: 600;
    }

    .success-actions {
        display: flex;
        gap: 12px;
        margin-top: 25px;
    }

    .print-btn {
        flex: 1;
        padding: 12px 20px;
        border: 2px solid #3B5AFE;
        background: white;
        color: #3B5AFE;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .print-btn:hover {
        background: #3B5AFE;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 90, 254, 0.3);
    }

    .new-sale-btn {
        flex: 1;
        padding: 12px 20px;
        border: none;
        background: #059669;
        color: white;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .new-sale-btn:hover {
        background: #047857;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
    }

    @keyframes successModalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-40px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    /* ========== RESPONSIVE DESIGN ========== */
    @media (max-width: 1024px) {
        .right-sidebar {
            width: 280px;
        }
        
        .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .right-sidebar {
            position: relative;
            width: 100%;
            height: auto;
            margin-top: 20px;
            border-radius: 12px;
        }
        
        .main-container {
            right: 15px;
        }
        
        .metrics-grid {
            grid-template-columns: 1fr;
        }
        
        .dashboard-grid {
            grid-template-columns: 1fr;
        }
        
        .checkout-modal {
            margin: 20px;
            padding: 20px;
            width: calc(100% - 40px);
        }

        .payment-options {
            flex-direction: column;
        }

        .checkout-actions {
            flex-direction: column;
        }
        
        .success-modal {
            margin: 20px;
            width: calc(100% - 40px);
        }

        .success-modal-content {
            padding: 20px 15px;
        }

        .receipt-header h1 {
            font-size: 1.5rem;
        }

        .success-actions {
            flex-direction: column;
        }
    }

    @media (max-width: 480px) {
        .main-container {
            left: 15px;
            right: 15px;
        }
        
        .sidebar {
            display: none;
        }
        
        .gender-tabs-container {
            flex-direction: column;
            gap: 15px;
        }
        
        .search-bar-container {
            width: 100%;
        }
    }

    .consumer-management {
    padding: 20px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.section-header h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
}

.search-container {
    position: relative;
    width: 300px;
}

.search-input {
    width: 100%;
    padding: 12px 20px 12px 45px;
    border: 2px solid #e5e7eb;
    border-radius: 25px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    border-color: #3B5AFE;
}

.search-container i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    font-size: 18px;
}

.metrics-grid-consumer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.metric-card-consumer {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 15px;
    transition: transform 0.3s ease;
}

.metric-card-consumer:hover {
    transform: translateY(-5px);
}

.metric-icon {
    font-size: 2.5rem;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border-radius: 15px;
}

.metric-content h3 {
    font-size: 1rem;
    color: #6b7280;
    margin: 0 0 8px 0;
    font-weight: 500;
}

.metric-value-consumer {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 5px 0;
}

.recent-consumers {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.recent-consumers h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 20px 0;
}

.consumers-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.consumer-item {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #f8fafc;
    border-radius: 12px;
    gap: 15px;
    transition: background-color 0.3s ease;
}

.consumer-item:hover {
    background: #f1f5f9;
}

.avatar-placeholder {
    width: 50px;
    height: 50px;
    background: #3B5AFE;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.1rem;
}

.consumer-details {
    flex: 1;
}

.consumer-details h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 5px 0;
}

.consumer-details p {
    color: #6b7280;
    margin: 0;
    font-size: 0.9rem;
}

.consumer-status {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.consumer-status.active {
    background: #dcfce7;
    color: #166534;
}

.consumer-status.inactive {
    background: #fef2f2;
    color: #dc2626;
}

.consumer-actions {
    display: flex;
    gap: 8px;
}

.action-btn {
    padding: 8px 16px;
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.action-btn.view {
    background: #3B5AFE;
    color: white;
    border-color: #3B5AFE;
}

.action-btn.view:hover {
    background: #2E47E6;
}

.action-btn.edit {
    background: white;
    color: #374151;
}

.action-btn.edit:hover {
    background: #f8fafc;
}

/* TRANSACTIONS STYLES */
.transactions-management {
    padding: 20px;
}

.metrics-grid-transactions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.metric-card-transaction {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 15px;
    transition: transform 0.3s ease;
}

.metric-card-transaction:hover {
    transform: translateY(-5px);
}

.metric-value-transaction {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1f2937;
    margin: 5px 0;
}

.metric-desc {
    color: #6b7280;
    font-size: 0.9rem;
}

.recent-transactions {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.transactions-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.transaction-item {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #f8fafc;
    border-radius: 12px;
    gap: 15px;
}

.transaction-icon {
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 10px;
}

.transaction-details {
    flex: 1;
}

.transaction-details h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 5px 0;
}

.transaction-details p {
    color: #6b7280;
    margin: 0;
    font-size: 0.9rem;
}

.transaction-amount {
    font-size: 1.2rem;
    font-weight: 700;
    color: #059669;
}

.transaction-status {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.transaction-status.completed {
    background: #dcfce7;
    color: #166534;
}

.transaction-status.pending {
    background: #fef9c3;
    color: #854d0e;
}

.transaction-status.processing {
    background: #dbeafe;
    color: #1e40af;
}

/* INVOICES STYLES */
.invoices-management {
    padding: 20px;
}

.header-actions {
    display: flex;
    gap: 15px;
    align-items: center;
}

.btn-primary {
    background: #3B5AFE;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.btn-primary:hover {
    background: #2E47E6;
}

.metrics-grid-invoices {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.metric-card-invoice {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.metric-card-invoice:hover {
    transform: translateY(-5px);
}

.metric-card-invoice.paid {
    border-left: 4px solid #10b981;
}

.metric-card-invoice.pending {
    border-left: 4px solid #f59e0b;
}

.metric-card-invoice.overdue {
    border-left: 4px solid #ef4444;
}

.metric-value-invoice {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin: 10px 0 5px 0;
}

.invoices-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.invoice-item {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #f8fafc;
    border-radius: 12px;
    gap: 15px;
}

.invoice-status.paid {
    background: #dcfce7;
    color: #166534;
}

.invoice-status.pending {
    background: #fef9c3;
    color: #854d0e;
}

.invoice-status.overdue {
    background: #fef2f2;
    color: #dc2626;
}

.action-btn.download {
    background: #6b7280;
    color: white;
    border: none;
}

.action-btn.download:hover {
    background: #4b5563;
}

/* SETTINGS STYLES */
/* ========== SETTINGS MANAGEMENT STYLES ========== */
.settings-management {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.settings-management .section-header {
    margin-bottom: 2rem;
}

.settings-management .section-header h2 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.settings-management .section-header p {
    color: #7f8c8d;
    font-size: 1.1rem;
}

.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
}

.settings-category {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
}

.settings-category:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.category-header {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.category-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
}

.category-header h3 {
    font-size: 1.3rem;
    font-weight: 600;
}

.settings-options {
    padding: 1.5rem;
}

.setting-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #ecf0f1;
}

.setting-option:last-child {
    border-bottom: none;
}

.setting-option span {
    font-weight: 500;
    color: #2c3e50;
}

.btn-outline {
    background: transparent;
    border: 1px solid #3498db;
    color: #3498db;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
}

.btn-outline:hover {
    background: #3498db;
    color: white;
}

/* Settings Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #ecf0f1;
}

.modal-header h3 {
    font-size: 1.5rem;
    color: #2c3e50;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #7f8c8d;
    padding: 0.2rem;
    line-height: 1;
}

.close-btn:hover {
    color: #e74c3c;
}

.modal-body {
    padding: 1.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #bdc3c7;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #3498db;
}

.checkbox-label {
    display: flex;
    align-items: center;
    font-weight: normal;
    cursor: pointer;
}

.checkbox-label input {
    width: auto;
    margin-right: 0.5rem;
}

.btn-primary {
    background: #3498db;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;
}

.btn-primary:hover {
    background: #2980b9;
}

.btn-small {
    padding: 0.3rem 0.7rem;
    font-size: 0.85rem;
    border: 1px solid #bdc3c7;
    background: white;
    border-radius: 3px;
    cursor: pointer;
    margin-left: 0.5rem;
}

.btn-danger {
    color: #e74c3c;
    border-color: #e74c3c;
}

.btn-danger:hover {
    background: #e74c3c;
    color: white;
}

.payment-method,
.shipping-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ecf0f1;
    border-radius: 5px;
    margin-bottom: 1rem;
}

.method-info,
.option-info {
    display: flex;
    flex-direction: column;
}

.default-badge {
    background: #2ecc71;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    font-size: 0.8rem;
    margin-top: 0.3rem;
    display: inline-block;
    width: fit-content;
}

.method-actions {
    display: flex;
}

.business-hours {
    max-height: 400px;
    overflow-y: auto;
}

.day-hours {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #ecf0f1;
}

.day-name {
    font-weight: 500;
    width: 100px;
}

.hours-inputs {
    display: flex;
    align-items: center;
}

.time-inputs {
    display: flex;
    align-items: center;
    margin-left: 1rem;
}

.time-inputs input {
    width: 120px;
    margin: 0 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .settings-grid {
        grid-template-columns: 1fr;
    }
    
    .settings-management {
        padding: 1rem;
    }
    
    .modal-content {
        width: 95%;
    }
    
    .day-hours {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .hours-inputs {
        margin-top: 0.5rem;
        width: 100%;
    }
    
    .method-actions {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .btn-small {
        margin-left: 0;
        margin-right: 0.5rem;
    }
}

/* Ensure these styles don't conflict with existing modal styles */
.settings-management .modal-overlay {
    /* Specific to settings modals */
}

.settings-management .modal-content {
    /* Specific to settings modals */
}

/* FEEDBACK STYLES */
.feedback-management {
    padding: 20px;
}

.metrics-grid-feedback {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.metric-card-feedback {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;
}

.metric-card-feedback:hover {
    transform: translateY(-5px);
}

.metric-value-feedback {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin: 10px 0 5px 0;
}

.metric-value-feedback.rating {
    font-size: 1.5rem;
}

.feedback-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.feedback-item {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 20px;
}

.feedback-rating {
    font-size: 1.2rem;
    color: #fbbf24;
    min-width: 100px;
}

.feedback-content {
    flex: 1;
}

.feedback-comment {
    font-size: 1.1rem;
    color: #374151;
    margin: 0 0 10px 0;
    font-style: italic;
}

.feedback-meta {
    display: flex;
    gap: 15px;
    font-size: 0.9rem;
    color: #6b7280;
}

.customer {
    font-weight: 600;
    color: #374151;
}

.action-btn.reply {
    background: #10b981;
    color: white;
    border: none;
}

.action-btn.reply:hover {
    background: #059669;
}

.rating-stars {
    display: flex;
    gap: 8px;
    align-items: center;
    margin: 10px 0;
}

.star-btn {
    background: none;
    border: none;
    font-size: 32px;
    cursor: pointer;
    opacity: 0.3;
    transition: all 0.2s ease;
    padding: 5px;
    position: relative;
}

.star-btn.active {
    opacity: 1;
    transform: scale(1.2);
}

.star-btn:hover {
    opacity: 0.8;
    transform: scale(1.1);
}

/* Visual indicator for selected rating */
.rating-display {
    margin-left: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    background: #f0f8ff;
    padding: 5px 12px;
    border-radius: 20px;
    border: 2px solid #4CAF50;
}

/* Star color variations based on rating */
.star-btn.active[data-star="1"],
.star-btn.active[data-star="2"] {
    color: #ff6b6b; /* Red for low ratings */
}

.star-btn.active[data-star="3"] {
    color: #ffa726; /* Orange for medium ratings */
}

.star-btn.active[data-star="4"],
.star-btn.active[data-star="5"] {
    color: #4CAF50; /* Green for high ratings */
}

/* Pulse animation when selecting */
.star-btn.active {
    animation: pulse 0.5s ease;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1.2); }
}

/* HELP STYLES */
.help-management {
    padding: 20px;
}

.help-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
}

.help-category, .contact-info {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.help-options {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.help-option {
    padding: 20px;
    background: #f8fafc;
    border-radius: 10px;
}

.help-option h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 8px 0;
}

.help-option p {
    color: #6b7280;
    margin: 0 0 15px 0;
    font-size: 0.9rem;
}

.contact-details {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.contact-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
}

.contact-item:last-child {
    border-bottom: none;
}

.contact-label {
    font-weight: 600;
    color: #374151;
}

.contact-value {
    color: #6b7280;
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
    .metrics-grid-consumer,
    .metrics-grid-transactions,
    .metrics-grid-invoices,
    .metrics-grid-feedback {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .settings-grid,
    .help-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .metrics-grid-consumer,
    .metrics-grid-transactions,
    .metrics-grid-invoices,
    .metrics-grid-feedback {
        grid-template-columns: 1fr;
    }
    
    .section-header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }
    
    .search-container {
        width: 100%;
    }
    
    .header-actions {
        flex-direction: column;
        width: 100%;
    }
    
    .btn-primary {
        width: 100%;
    }
}
</style>

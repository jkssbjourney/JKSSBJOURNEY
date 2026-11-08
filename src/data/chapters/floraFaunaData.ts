import { Chapter } from '../../types/index.ts';

export const FLORA_FAUNA_CHAPTER: Chapter = {
  id: 'flora-fauna',
  title: 'Flora & Fauna of Jammu & Kashmir',
  shortTitle: '🌿 Flora & Fauna',
  icon: '🌿',
  category: 'J&K Ecology & Protected Areas',
  readTime: '22 min read',
  sectionsCount: 12,
  summary: 'Comprehensive guide to national parks, wildlife sanctuaries, Ramsar wetlands, botanical treasures, endemic fauna (Hangul, Markhor, Snow Leopard), forest laws, ISFR 2021 forestry data, and sample previous year questions.',
  sections: [
    {
      id: 'national-parks-jk',
      title: '1. National Parks of Jammu & Kashmir',
      badge: 'Protected Areas',
      content: [
        'Following the reorganisation in 2019, Jammu & Kashmir UT hosts four designated National Parks (with Hemis National Park now located in the Union Territory of Ladakh). Each national park preserves distinct altitudinal bio-zones ranging from sub-tropical riverine belts to sub-alpine conifer zones and alpine meadows.',
      ],
      table: {
        caption: 'Designated National Parks in Jammu and Kashmir UT',
        headers: ['National Park', 'District / Location', 'Notified Area (sq km)', 'Key Wildlife & Endangered Species', 'Distinguishing Ecological Highlights'],
        rows: [
          [
            'Dachigam National Park',
            'Srinagar (22 km northeast of city)',
            '141.00 sq km',
            'Hangul (Cervus hanglu hanglu), Himalayan Black Bear, Brown Bear, Leopard, Serow, Yellow-throated Marten',
            'Only remaining natural habitat of the critically endangered Kashmir Stag (Hangul). "Dachigam" translates to "Ten Villages". Divided into Lower and Upper Dachigam (extending to Marsar Lake).'
          ],
          [
            'Kishtwar High Altitude National Park',
            'Kishtwar District',
            '425.00 sq km',
            'Snow Leopard (Panthera uncia), Himalayan Musk Deer, Himalayan Tahr, Ibex, Brown Bear',
            'Largest national park in J&K UT; high altitude rugged terrain drained by Kibar, Rinnay, and Marusudar rivers.'
          ],
          [
            'Kazinag National Park',
            'Baramulla District (near Uri / LOC)',
            '160.00 sq km',
            'Markhor (Capra falconeri), Himalayan Musk Deer, Common Leopard, Monal Pheasant',
            'Created in 2007 by consolidating Limber, Lachipora WLS, and Kazinag reserve to safeguard the world’s largest wild goat (Markhor).'
          ],
          [
            'City Forest (Salim Ali) National Park',
            'Srinagar (near Dal Lake)',
            '9.07 sq km',
            'Serow, Musk Deer, Flying Fox, Himalayan Monal, Paradise Flycatcher',
            'Named in honor of Dr. Salim Ali, the celebrated "Birdman of India". Formed in 1986; part was later converted into the Royal Springs Golf Course.'
          ],
        ],
      },
      examPoints: [
        'Kishtwar High Altitude National Park is the largest national park in J&K UT (425 sq km).',
        'Hemis National Park (4,400 sq km), India’s largest national park, is located in the Union Territory of Ladakh, NOT Jammu and Kashmir.',
        'Dachigam was originally created in 1910 by Maharaja Hari Singh as a royal game preserve (Rakh) to protect the catchment of Harwan reservoir, which supplies clean drinking water to Srinagar.',
      ],
      correctionNotes: [
        'Verification Alert: Hemis National Park is in Ladakh UT. If an exam question asks "Largest National Park in Jammu & Kashmir UT today", the answer is Kishtwar High Altitude National Park.',
      ],
    },
    {
      id: 'wildlife-sanctuaries-jk',
      title: '2. Wildlife Sanctuaries of Jammu & Kashmir',
      badge: 'Wildlife Sanctuaries',
      content: [
        'Jammu & Kashmir has 14 notified Wildlife Sanctuaries (WLS) covering over 1,500 sq km, distributed across both Jammu and Kashmir divisions.',
      ],
      table: {
        caption: 'Notified Wildlife Sanctuaries in J&K UT',
        headers: ['Sanctuary Name', 'District', 'Approx. Area (sq km)', 'Key Fauna & Vegetation'],
        rows: [
          ['Gulmarg WLS', 'Baramulla', '180.00 sq km', 'Musk Deer, Brown Bear, Leopard, Red Fox, Koklass Pheasant.'],
          ['Overa-Aru WLS', 'Anantnag (Pahalgam)', '511.00 sq km', 'Hangul, Musk Deer, Brown Bear, Snow Cock, Monal; Lidder catchment.'],
          ['Limber WLS', 'Baramulla', '26.00 sq km', 'Markhor, Brown Bear, Musk Deer, Serow; part of Kazinag NP complex.'],
          ['Lachipora WLS', 'Baramulla', '80.00 sq km', 'Markhor, Leopard, Yellow-throated Marten; dense conifer forests.'],
          ['Rajparian (Daksum) WLS', 'Anantnag', '20.00 sq km', 'Hangul summer habitat, Himalayan Black Bear, Musk Deer.'],
          ['Hirpora WLS', 'Shopian', '341.00 sq km', 'Markhor, Tibetan Wolf, Musk Deer; Mughal Road passes through it.'],
          ['Thajwas (Baltal) WLS', 'Ganderbal (Sonamarg)', '203.00 sq km', 'Musk deer, Snow Leopard, Ibex, Brown Bear; alpine birch forests.'],
          ['Ramnagar WLS', 'Jammu', '31.00 sq km', 'Barking Deer (Kakar), Rhesus Macaque, Peafowl, Grey Partridge.'],
          ['Nandini WLS', 'Jammu / Samba', '33.34 sq km', 'Pheasants, Peafowl, Indian Myna, Wild Boar, Leopard.'],
          ['Jasrota WLS', 'Kathua', '10.04 sq km', 'Spotted Deer (Cheetal), Barking Deer, Wild Boar, Peafowl.'],
          ['Surinsar-Mansar WLS', 'Jammu / Udhampur', '55.93 sq km', 'Barking Deer, Goral, Wild Boar, Softshell Turtles; wetland biodiversity.'],
          ['Trikuta WLS', 'Reasi (Katra)', '31.77 sq km', 'Goral, Barking Deer, Leopard, Jungle Fowl; surrounds Vaishno Devi.'],
        ],
      },
      examPoints: [
        'Overa-Aru WLS in Pahalgam is the largest Wildlife Sanctuary in Kashmir division (511 sq km).',
        'Hirpora WLS in Shopian is critically threatened because the historical Mughal Road bisects the core habitat of the Pir Panjal Markhor.',
      ],
    },
    {
      id: 'conservation-reserves',
      title: '3. Conservation Reserves by District',
      badge: 'Protected Reserves',
      content: [
        'Conservation Reserves serve as critical biological corridors linking sanctuaries with national parks to avoid genetic fragmentation.',
      ],
      table: {
        caption: 'Major Conservation Reserves in J&K UT',
        headers: ['Conservation Reserve', 'District', 'Key Species / Ecological Role'],
        rows: [
          ['Brain-Nishat Reserve', 'Srinagar', 'Corridor for Hangul moving between Dachigam and Zabarwan range.'],
          ['Khimber / Dara Reserve', 'Srinagar', 'Northern buffer zone for Dachigam National Park.'],
          ['Khrew / Shikargah Reserve', 'Pulwama (Tral)', 'Hangul breeding and captive center; connected to Dachigam.'],
          ['Wangat / Chaturgul Reserve', 'Ganderbal', 'Sindh valley watershed and sub-alpine wildlife corridor.'],
          ['Achabal Reserve', 'Anantnag', 'Famous for natural spring, Mughal garden, and royal trout hatchery.'],
          ['Gharana Wetland Reserve', 'Jammu (R.S. Pura)', 'Wintering staging ground for thousands of migratory Bar-headed Geese.'],
        ],
      },
      examPoints: [
        'Shikargah (Tral, Pulwama) hosts the first ever Hangul Captive Breeding Center in India.',
        'Gharana Wetland in R.S. Pura (Jammu) is world-famous for attracting flocks of Bar-headed Geese (Anser indicus) flying over the Himalayas from Central Asia.',
      ],
    },
    {
      id: 'ramsar-wetlands',
      title: '4. Wetland Reserves & Ramsar Sites of J&K',
      badge: 'Ramsar Wetlands',
      content: [
        'Wetlands are ecological sponges that mitigate floods and shelter resident and migratory avian species. Jammu and Kashmir boasts five internationally recognized Ramsar Wetland Sites under the Ramsar Convention.',
      ],
      table: {
        caption: 'Ramsar Wetland Sites in Jammu and Kashmir UT',
        headers: ['Ramsar Site Name', 'Designation Year', 'District', 'Area (ha)', 'Key Ecological Features'],
        rows: [
          ['Wular Lake', '1990', 'Bandipora', '18,900 ha', 'Largest freshwater lake in India; fed by River Jhelum; vital waterfowl refuge.'],
          ['Hokera (Hokersar) Wetland', '2005', 'Srinagar / Budgam', '1,375 ha', 'Known as "Queen of Wetlands"; shelters up to 1 million migratory waterfowls in winter.'],
          ['Surinsar-Mansar Lakes', '2005', 'Jammu / Udhampur', '350 ha', 'Twin sacred subtropical freshwater lakes; home to Indian flap-shelled turtle and rare fishes.'],
          ['Hygam Wetland Conservation Reserve', '2022', 'Baramulla', '801 ha', 'Reed-covered biodiversity haven on Jhelum flood basin; designated under Ramsar in Aug 2022.'],
          ['Shallabugh Wetland Conservation Reserve', '2022', 'Ganderbal', '1,675 ha', 'Extensive delta wetland of River Sindh & Jhelum; designated Ramsar site in Aug 2022.'],
        ],
      },
      examPoints: [
        'Jammu and Kashmir currently has 5 official Ramsar Sites.',
        'Wular Lake was the first Ramsar site declared in J&K (1990).',
        'Hygam and Shallabugh were added to the Ramsar List in 2022 on the occasion of the 75th year of Indian Independence.',
      ],
    },
    {
      id: 'important-flora',
      title: '5. Important Flora, Trees & Scientific Names',
      badge: 'Botany',
      content: [
        'The flora of J&K ranges from tropical deciduous in Jammu plains to temperate coniferous, birch, and alpine meadows in Kashmir and higher ridges.',
      ],
      table: {
        caption: 'Major Flora of J&K & Their Botanical Designations',
        headers: ['Common / Kashmiri Name', 'Scientific Botanical Name', 'Family', 'Key Botanical Characteristics & Uses'],
        rows: [
          ['Chinar (Booni)', 'Platanus orientalis', 'Platanaceae', 'Royal deciduous shade tree; state tree of J&K; five-lobed leaves turn fiery orange-red in autumn (Harud).'],
          ['Deodar (Diyar)', 'Cedrus deodara', 'Pinaceae', '"Wood of the Gods"; durable aromatic conifer; premier structural timber for houseboats, bridges, and temples.'],
          ['Blue Pine (Kail)', 'Pinus wallichiana', 'Pinaceae', 'Five-needled pine found between 1,800m and 3,000m; popular for joinery and furniture.'],
          ['Silver Fir (Budloo)', 'Abies pindrow', 'Pinaceae', 'Tallest conifer of Western Himalayas; soft white wood used for fruit boxes and pulp.'],
          ['Kashmir Willow (Veer)', 'Salix alba var. caerulea', 'Salicaceae', 'Lightweight elastic wood world-renowned for manufacturing professional cricket bats in Sangam, Anantnag.'],
          ['Himalayan Birch (Burza)', 'Betula utilis', 'Betulaceae', 'High-altitude sub-alpine tree; papery white bark (Bhojpatra) historically used as writing surface for ancient Sanskrit texts.'],
          ['Walnut (Doon)', 'Juglans regia', 'Juglandaceae', 'Dense fine-grained wood utilized exclusively for delicate Kashmiri wood-carving; edible brain-shaped nuts.'],
          ['Saffron (Kong / Zafran)', 'Crocus sativus', 'Iridaceae', 'Triploid perennial bulb; crimson stigmas hand-picked for high-value spice and natural dye; GI tag Pampore.'],
        ],
      },
      examPoints: [
        'The oldest living Chinar tree in the world is located at Chattergam (Budgam district), planted in 1374 CE by Sufi Saint Syed Abul Qasim Simnani (over 650 years old with a circumference of over 14 meters).',
        'Cricket Bat manufacturing cluster is concentrated along National Highway 44 at Sangam (Anantnag district).',
      ],
      correctionNotes: [
        'Clarification: Kashmiri cricket bats are made from English Willow cultivated in Kashmir (Salix alba var. caerulea), not weeping willow (Salix babylonica).',
      ],
    },
    {
      id: 'medicinal-plants',
      title: '6. High-Altitude Medicinal Plants & Forest Produce',
      badge: 'Medicinal Plants',
      content: [
        'Kashmir has earned global renown as the "Natural Herbal Pharmacy of the Himalayas" due to its rich repository of medicinal and aromatic plants (MAPs).',
      ],
      table: {
        caption: 'Key Medicinal Plants of J&K',
        headers: ['Local Name', 'Botanical Name', 'Medicinal Therapeutic Use'],
        rows: [
          ['Tethwan', 'Artemisia absinthium', 'Anthelmintic, treats digestive ailments and chronic fever.'],
          ['Kuth (Costus)', 'Saussurea costus', 'Critically endangered; roots used in perfumes, respiratory medicines, and incense.'],
          ['Kour (Gentian)', 'Picrorhiza kurroa', 'Intensely bitter rhizome used for liver disorders, jaundice, and immunity.'],
          ['Kahzaban', 'Arnebia benthamii', 'Traditional Himalayan remedy for pulmonary diseases and sore throat.'],
          ['Banafsha', 'Viola odorata', 'Used in Unani formulations for soothing coughs, catarrh, and head colds.'],
          ['Belladonna', 'Atropa acuminata', 'Source of atropine alkaloid; pupil dilator and antispasmodic.'],
          ['Guchhi (Morel Mushroom)', 'Morchella esculenta', 'Wild edible fungus rich in antioxidants; fetches up to ₹30,000 per kg in export.'],
        ],
      },
      examPoints: [
        'Kuth (Saussurea costus) was so valuable historically that the Dogra government established a special "Kuth Act" and dedicated forest guards to prevent its illegal smuggling.',
      ],
    },
    {
      id: 'important-fauna',
      title: '7. Important Fauna & IUCN Red List Status',
      badge: 'Fauna',
      content: [
        'The wildlife of Jammu and Kashmir represents a blend of Palearctic, Oriental, and Central Asian biogeographic realms.',
      ],
      table: {
        caption: 'Threatened Mammals & Birds of Jammu & Kashmir',
        headers: ['Species Name', 'Scientific Name', 'IUCN Red List Status', 'Habitat & Presence in J&K'],
        rows: [
          ['Hangul (Kashmir Stag)', 'Cervus hanglu hanglu', 'Critically Endangered (CR)', 'Dachigam National Park & Shikargah corridor. J&K State/UT Animal.'],
          ['Pir Panjal Markhor', 'Capra falconeri cashmiriensis', 'Near Threatened (NT)', 'Kazinag NP, Limber, Lachipora, and Hirpora WLS; largest wild goat.'],
          ['Snow Leopard', 'Panthera uncia', 'Vulnerable (VU)', 'Kishtwar High Altitude NP; rocky crags above 3,500 meters.'],
          ['Himalayan Musk Deer', 'Moschus leucogaster', 'Endangered (EN)', 'Sub-alpine conifer forests in Gulmarg, Overa, Kishtwar; targeted for musk pod.'],
          ['Himalayan Brown Bear', 'Ursus arctos isabellinus', 'Critically Endangered (local)', 'Higher alpine valleys of Sonamarg, Drass, Pahalgam.'],
          ['Asiatic Black Bear', 'Ursus thibetanus', 'Vulnerable (VU)', 'Deciduous and conifer forests of Dachigam, Overa-Aru.'],
          ['Kalij Pheasant', 'Lophura leucomelanos', 'Least Concern (LC)', 'Official UT Bird of Jammu & Kashmir (notified Oct 2021).'],
          ['Black-necked Crane', 'Grus nigricollis', 'Near Threatened (NT)', 'Breeds in high-altitude wetlands (now official bird of Ladakh UT).'],
        ],
      },
      examPoints: [
        'Official UT Animal of J&K: Hangul (Cervus hanglu hanglu).',
        'Official UT Bird of J&K: Kalij Pheasant (Lophura leucomelanos).',
        'Hangul is a sub-species of European Red Deer and the only surviving race of red deer in the Indian subcontinent.',
      ],
      correctionNotes: [
        'Common Mistake in Previous Papers: The Black-necked Crane was the state bird of undivided J&K. After 2019, Kalij Pheasant was designated UT bird of J&K, while Black-necked Crane remains UT bird of Ladakh.',
      ],
    },
    {
      id: 'hangul-conservation',
      title: '8. Project Hangul & Conservation Programs',
      badge: 'Conservation Initiatives',
      content: [
        'Project Hangul was launched in 1970 by the J&K Government in collaboration with the World Wildlife Fund (WWF) and IUCN (under technical guidance of Dr. Fred Kurt).',
        'Hangul Population Trend: Estimated at around 3,000–5,000 individuals in the early 20th century. By 1970, poaching and habitat degradation had crashed the population down to around 150.',
        'Census Mechanism: Biannual Hangul census conducted by the Department of Wildlife Protection in March. The 2023 Hangul Census recorded 289 individuals, showing a gradual, encouraging revival.',
        'Threats: Low fawn-to-female ratio, sheep breeding farm at Lower Dachigam (which caused fodder competition and was subsequently relocated), predation by leopards and stray dogs, and severed migration corridors.',
      ],
      examPoints: [
        'Project Hangul was launched in 1970.',
        'Hangul Census 2023 counted 289 stags in and around Dachigam.',
      ],
    },
    {
      id: 'forest-laws-timeline',
      title: '9. Forest Administration & Statutory Timeline',
      badge: 'Legislation',
      content: [
        'Forestry has been the economic backbone of J&K, regulated through progressive statutory frameworks since the 19th century.',
      ],
      table: {
        caption: 'Key Forest Legislation & Milestones',
        headers: ['Year', 'Forest Law / Policy Milestone', 'Significance & Objective'],
        rows: [
          ['1857', 'First Forest Regulations under Maharaja Gulab Singh', 'Controlled timber felling along rivers for export to Punjab.'],
          ['1891', 'Establishment of J&K Forest Department', 'Mr. J.C. Macdonell appointed the first Conservator of Forests.'],
          ['1930', 'J&K Forest Act (Samvat 1987)', 'Comprehensive regulation of demarcated, undemarcated, and village forests.'],
          ['1978', 'J&K Wildlife (Protection) Act, 1978', 'Created the Wildlife Protection Department; regulated sanctuaries and hunting.'],
          ['1987', 'J&K State Forest Corporation Act', 'Monopolized timber extraction to eliminate corrupt private timber contractors.'],
          ['2010', 'J&K State Forest Policy, 2010', 'Prioritized conservation, participatory forest management, and biodiversity protection.'],
          ['2019', 'Application of Indian Forest Act, 1927 & Wildlife Protection Act, 1972', 'Extended Central environmental and forest acts to J&K under Reorganisation Act.'],
        ],
      },
      examPoints: [
        'The first Conservator of Forests in J&K was Mr. J.C. Macdonell (1891).',
        'Central Wildlife (Protection) Act, 1972 became applicable to J&K on 31 October 2019.',
      ],
    },
    {
      id: 'isfr-2021-data',
      title: '10. India State of Forest Report (ISFR 2021) — J&K Highlights',
      badge: 'Forestry Statistics',
      content: [
        'The biennial India State of Forest Report (ISFR) published by the Forest Survey of India (FSI), Dehradun, provides the authoritative statistical baseline for forestry questions in JKSSB examinations.',
      ],
      table: {
        caption: 'Key ISFR 2021 Forest Metrics for J&K UT',
        headers: ['Forest Metric Category', 'Area / Percentage in J&K UT', 'Key Detail / Comparison'],
        rows: [
          ['Total Geographical Area (J&K UT)', '53,258 sq km', 'Excluding Ladakh UT.'],
          ['Total Forest Cover', '21,387 sq km', '39.15% of the total geographical area of J&K UT.'],
          ['Very Dense Forest (VDF)', '4,155 sq km', 'Canopy density > 70%.'],
          ['Moderately Dense Forest (MDF)', '8,117 sq km', 'Canopy density between 40% and 70%.'],
          ['Open Forest (OF)', '9,115 sq km', 'Canopy density between 10% and 40%.'],
          ['Scrub Area', '284 sq km', 'Degraded forest land canopy < 10%.'],
          ['Tree Cover (Outside Forest)', '748 sq km', 'Trees in agro-forestry and orchards.'],
          ['District with Largest Forest Cover (by area)', 'Reasi & Udhampur / Doda', 'Reasi has 1,872 sq km of forest cover.'],
          ['District with Highest Forest Cover (% of total area)', 'Shopian (around 52.8%)', 'Highest percentage of geographical area under forest.'],
        ],
      },
      examPoints: [
        'Forest cover in J&K accounts for approximately 39.15% of its total geographical area.',
        'Shopian has the highest percentage of forest cover relative to its geographical area.',
      ],
    },
    {
      id: 'flora-fauna-pyqs',
      title: '11. Sample Previous Year Questions (PYQs) with Solutions',
      badge: 'Exam Practice',
      pyqs: [
        {
          question: 'Which of the following is the exclusive natural habitat of the Hangul (Kashmir Stag)?',
          exam: 'JKSSB FAA 2022',
          answer: 'Dachigam National Park',
          explanation: 'Dachigam National Park located near Srinagar is the only remaining viable natural habitat for the critically endangered Hangul.',
        },
        {
          question: 'In which district of Jammu and Kashmir is the oldest Chinar tree located?',
          exam: 'JKSSB SI 2022',
          answer: 'Budgam (Chattergam village)',
          explanation: 'The oldest Chinar was planted in 1374 CE by Sufi Saint Syed Abul Qasim Simnani at Chattergam in Budgam district.',
        },
        {
          question: 'The Pir Panjal Markhor is classified under which IUCN conservation category?',
          exam: 'JKSSB Junior Assistant 2021',
          answer: 'Near Threatened (NT)',
          explanation: 'The Markhor (Capra falconeri) is categorized as Near Threatened on the global IUCN Red List.',
        },
        {
          question: 'How many wetland sites from Jammu & Kashmir are currently designated under the Ramsar Convention?',
          exam: 'JKSSB VLW / Panchayat Secretary 2023',
          answer: '5 Sites',
          explanation: 'Wular, Hokera, Surinsar-Mansar, Hygam, and Shallabugh make up the 5 Ramsar sites of J&K.',
        },
      ],
    },
    {
      id: 'flora-fauna-quick-revision',
      title: '12. Flora & Fauna Quick Revision Table',
      badge: 'Quick Revision',
      table: {
        caption: 'High-Yield Memory Hooks for JKSSB Aspirants',
        headers: ['Topic / Term', 'Exam Answer / Associated Fact'],
        rows: [
          ['UT Animal of J&K', 'Hangul (Cervus hanglu hanglu)'],
          ['UT Bird of J&K', 'Kalij Pheasant (Lophura leucomelanos) - declared Oct 2021'],
          ['UT Tree of J&K', 'Chinar (Platanus orientalis) / Booune'],
          ['UT Flower of J&K', 'Common Lotus (Nelumbo nucifera)'],
          ['Largest National Park in J&K UT', 'Kishtwar High Altitude National Park (425 sq km)'],
          ['Only National Park for Hangul', 'Dachigam National Park (141 sq km)'],
          ['Largest Wildlife Sanctuary in Kashmir', 'Overa-Aru WLS (511 sq km) in Pahalgam'],
          ['First Ramsar site in J&K', 'Wular Lake (1990)'],
          ['Newest Ramsar sites in J&K (2022)', 'Hygam Wetland & Shallabugh Wetland'],
          ['Project Hangul start year', '1970 (collaborated with IUCN and WWF)'],
          ['Wood used for Kashmir Cricket Bats', 'Kashmir Willow (Salix alba var. caerulea)'],
          ['Ancient writing bark from Birch', 'Bhojpatra (Betula utilis)'],
          ['World’s oldest Chinar tree age', 'Over 650 years (planted 1374 CE at Chattergam)'],
        ],
      },
      examPoints: [
        'Review these 13 bullet rows prior to test entry.',
      ],
    },
  ],
};

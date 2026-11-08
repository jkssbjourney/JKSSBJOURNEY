import { Chapter } from '../../types/index.ts';

export const RIVERS_LAKES_CHAPTER: Chapter = {
  id: 'rivers-lakes',
  title: 'Rivers & Lakes of Jammu & Kashmir',
  shortTitle: '🌊 Rivers & Lakes',
  icon: '🌊',
  category: 'J&K Drainage & Hydrography',
  readTime: '24 min read',
  sectionsCount: 12,
  summary: 'In-depth hydrological guide covering the Indus drainage basin: River Jhelum (Vitasta), Chenab (Chandrabhaga), Tawi (Surya Putri), Ravi, the 1960 Indus Waters Treaty, alpine and floodplain lakes (Wular, Dal, Manasbal), historical irrigation canals, major hydroelectric projects, and previous year exam questions.',
  sections: [
    {
      id: 'rivers-at-a-glance',
      title: '1. Rivers of J&K at a Glance (Sources & Classical Names)',
      badge: 'Drainage Overview',
      content: [
        'All rivers of Jammu and Kashmir belong to the mighty Indus River Drainage Basin, emptying eventually into the Arabian Sea. The Himalayan ranges (Zanskar, Greater Himalayas, Pir Panjal) carve steep V-shaped gorges and provide copious glacial meltwater throughout the year.',
      ],
      table: {
        caption: 'Major Rivers of Jammu and Kashmir UT: Origins & Nomenclature',
        headers: ['River Name', 'Ancient / Sanskrit Name', 'Greek Classical Name', 'Kashmiri / Local Name', 'Primary Source & Origin'],
        rows: [
          ['Jhelum', 'Vitasta', 'Hydaspes', 'Vyeth', 'Verinag Spring at the foot of Pir Panjal (Anantnag).'],
          ['Chenab', 'Asikni / Chandrabhaga', 'Acesines', 'Chinar / Chenab', 'Confluence of Chandra and Bhaga rivers at Tandi (Lahaul, HP). Enters J&K at Paddar.'],
          ['Tawi', 'Surya Putri ("Daughter of Sun")', '—', 'Tawi', 'Kali Kundi / Kailash Kund glacier near Seoj Dhar (Bhaderwah).'],
          ['Ravi', 'Purushni / Iravati', 'Hydraotes', 'Ravi', 'Near Rohtang Pass (Kullu Hills, HP); forms J&K-Punjab boundary near Kathua.'],
          ['Indus', 'Sindhu', 'Sinthos', 'Sengge Zangbo (Lion’s Mouth)', 'Bokhar Chu glacier near Mount Kailash & Lake Manasarovar (Tibet).'],
          ['Kishanganga', 'Krishna', '—', 'Neelum', 'Krishansar Lake near Sonamarg; flows through Gurez before joining Jhelum at Domel.'],
          ['Lidder', 'Lambodari', '—', 'Liddur', 'Formed by East Lidder (Sheshnag) and West Lidder (Kolahoi Glacier); joins Jhelum at Mirgund.'],
          ['Veshav', 'Visoka', '—', 'Veshaw', 'Kausarnag Lake (Pir Panjal); forms Aharbal waterfall ("Niagara of Kashmir").'],
          ['Sindh Valley River', 'Uttara Ganga', '—', 'Sendh', 'Machoi Glacier near Zojila Pass; joins Jhelum at Shadipora (Prayag of Kashmir).'],
        ],
      },
      examPoints: [
        'Vedic name of Jhelum: Vitasta; Greek name: Hydaspes (Alexander fought King Porus on its banks in 326 BCE at the Battle of the Hydaspes).',
        'Vedic name of Chenab: Asikni; Sanskrit name: Chandrabhaga.',
        'Vedic name of Ravi: Purushni; Sanskrit name: Iravati.',
      ],
      correctionNotes: [
        'Caution: Do not confuse the Sindh River of Kashmir Valley (a major tributary of Jhelum originating near Zojila) with the Indus River (Sindhu).',
      ],
    },
    {
      id: 'river-jhelum-drainage',
      title: '2. The River Jhelum (Vitasta / Vyeth)',
      badge: 'Lifeline of Valley',
      content: [
        'The Jhelum is the master stream and lifeblood of the Kashmir Valley. Total length is approximately 725 km, of which about 165 km meanders navigable through the flat alluvial bed of Kashmir.',
        'Origin & Course: Rises from the octagonal deep spring at Verinag at the foot of Pir Panjal in Anantnag. It flows north-westward through Khanabal, Srinagar, enters Wular Lake at Banyari, exits at Sopore, and leaves the valley through a 2,000-meter deep gorge between Baramulla and Uri toward Muzaffarabad.',
      ],
      table: {
        caption: 'Tributaries of River Jhelum',
        headers: ['Bank Position', 'Tributary River', 'Origin / Source', 'Confluence Point with Jhelum'],
        rows: [
          ['Right Bank', 'Lidder River', 'Kolahoi Glacier & Sheshnag', 'Mirgund (near Khanabal, Anantnag)'],
          ['Right Bank', 'Sindh Valley River', 'Machoi Glacier (Zojila)', 'Shadipora (Ganderbal) — "Prayag of Kashmir"'],
          ['Right Bank', 'Pohru River', 'Lolab Valley & Kazinag', 'Doabgah (near Sopore)'],
          ['Right Bank', 'Aripal / Tral Stream', 'Nagberan hills', 'Near Awantipora'],
          ['Left Bank', 'Veshav River', 'Kausarnag Lake', 'Sangam (near Anantnag)'],
          ['Left Bank', 'Rambiara River', 'Pir Panjal (near Roopri)', 'Sangam (joins Veshav before Jhelum)'],
          ['Left Bank', 'Romshi River', 'Pir Panjal range', 'Near Pulwama / Kakapora'],
          ['Left Bank', 'Doodhganga River', 'Tatagoti peak / Yusmarg', 'Chattargam / Srinagar outskirts'],
          ['Left Bank', 'Sukhnag River', 'Gulmarg / Tosamaidan springs', 'Mirgund wetland'],
        ],
      },
      examPoints: [
        'The sacred sangam (confluence) of Sindh River and Jhelum at Shadipora is venerated as the Prayag of Kashmir, marked by an ancient Chinar tree growing on a stone platform (Prayag Chinar).',
        'The Jhelum is navigable without waterfalls or rapids from Khanabal (Anantnag) to Baramulla (a distance of 102 miles).',
      ],
    },
    {
      id: 'indus-waters-treaty',
      title: '3. Indus River & The Indus Waters Treaty (1960)',
      badge: 'International Treaty',
      content: [
        'The Indus River (3,180 km total) enters the Union Territory of Ladakh near Damchok and flows between the Ladakh and Zanskar mountain ranges.',
        'The Indus Waters Treaty (IWT) was signed on September 19, 1960, in Karachi by Indian Prime Minister Jawaharlal Nehru and Pakistani President Mohammad Ayub Khan, brokered by the World Bank (Mr. W.A.B. Iliff).',
      ],
      table: {
        caption: 'Division of Rivers under the Indus Waters Treaty (1960)',
        headers: ['River Category', 'Rivers Included', 'Country Allocation', 'Permissible Usage Rights & Restrictions'],
        rows: [
          [
            'Eastern Rivers',
            'Ravi, Beas, Sutlej',
            'India (Unrestricted)',
            'India has exclusive, unrestricted right to all waters of the Eastern rivers for irrigation, storage, and power generation.'
          ],
          [
            'Western Rivers',
            'Indus, Jhelum, Chenab',
            'Pakistan (Allocated)',
            'Pakistan receives majority of water (~80%). India is permitted to utilize Western waters for domestic non-consumptive use, limited agricultural irrigation, and Run-of-the-River hydroelectric projects without altering volumetric storage.'
          ],
        ],
      },
      examPoints: [
        'Date of IWT signing: 19 September 1960 at Karachi.',
        'Permanent Indus Commission (PIC): Bilateral body with one commissioner from each country mandated to meet at least once annually.',
        'Disputed Hydroelectric Projects: Tulbul Navigation Project / Wular Barrage (Jhelum), Baglihar Dam (Chenab - adjudicated by neutral expert Raymond Lafitte in 2007), Kishanganga HEP (Gurez), and Ratle HEP (Chenab).',
      ],
      correctionNotes: [
        'Key Exam Distinction: Under the IWT, India can build hydroelectric projects on Western Rivers (Jhelum, Chenab, Indus) provided they are Run-of-the-River (RoR) plants with no permanent water diversion or reservoir impoundment that violates storage allowances.',
      ],
    },
    {
      id: 'river-chenab-system',
      title: '4. The Chenab River System (Chandrabhaga)',
      badge: 'Hydro Power Hub',
      content: [
        'The Chenab is the largest river of Jammu and Kashmir in terms of discharge volume.',
        'Origin: Formed by two mountain torrents: Chandra (originating near Baralacha La pass) and Bhaga (originating near Suraj Tal lake) in Lahaul-Spiti, Himachal Pradesh. They merge at Tandi to form the Chandrabhaga.',
        'Course in J&K: Enters J&K at Paddar in Kishtwar district. It cuts through deep, sensational gorges across Kishtwar, Doda, and Ramban, forms the boundary between Reasi and Udhampur, and emerges onto the plains at Akhnoor in Jammu before flowing into Sialkot (Pakistan).',
        'Major Tributaries in J&K: Marusudar River (the biggest tributary of Chenab in J&K, originating from Nunkun glacier and joining at Bhandarkot, Kishtwar), Kalnai stream, Ans River (Reasi), and Tawi River (joins Chenab in Pakistan).',
      ],
      examPoints: [
        'The world’s highest railway arch bridge (Chenab Bridge, 359 meters above riverbed, 1,315 meters long) connects Bakkal and Kauri in Reasi district.',
        'Marusudar River is the largest tributary of Chenab in Jammu & Kashmir.',
        'Akhnoor is the historical town where the Chenab leaves the mountains and enters the plains; site of Maharaja Gulab Singh’s coronation (Raj Tilak) by Ranjit Singh in 1822 under a Jia Pota tree.',
      ],
    },
    {
      id: 'tawi-and-ravi',
      title: '5. The Tawi & Ravi River Systems',
      badge: 'Jammu Drainage',
      content: [
        'River Tawi (Surya Putri): Originates from Kali Kundi glacier at the lap of Seoj Dhar / Kailash Kund in Bhaderwah (Doda district). It flows through Chenani, Udhampur, and Jammu city. It divides Jammu into the Old City (hilltop fort of Bahu) and New City (Jammu Tawi railway station). Total length is about 141 km.',
        'River Ravi (Iravati / Purushni): Originates near Bara Bhangal / Rohtang Pass in Kangra, Himachal Pradesh. It touches J&K along the international border of Kathua district, forming the boundary between J&K and Punjab. Key tributaries in J&K include the Ujh River (rising from Kailash mountains near Ramkot) and Basantar River (Samba).',
      ],
      table: {
        caption: 'Tawi vs. Ravi Comparison in J&K',
        headers: ['Feature', 'River Tawi', 'River Ravi / Ujh'],
        rows: [
          ['Origin', 'Kali Kundi / Seoj Dhar (Bhaderwah)', 'Bara Bhangal (Himachal Pradesh)'],
          ['Mythological Association', 'Daughter of Sun God (Surya Putri), brought to earth by Raja Pehar Dev.', 'Associated with Sage Iravat and Vedic hymns.'],
          ['Key Bridges / Cities', 'Jammu City bridges, Chenani, Udhampur.', 'Atal Setu cable-stayed bridge at Basohli (Kathua).'],
          ['Tributaries in J&K', 'Dudhar, Sardari, and local nullahs.', 'Ujh River, Tarnah, Sewa River, Basantar.'],
        ],
      },
      examPoints: [
        'Atal Setu (592m long cable-stayed bridge across river Ravi at Basohli) is the first cable-stayed bridge in North India, connecting J&K with Punjab and HP.',
        'The Ujh Multipurpose Project is under development on River Ujh (tributary of Ravi) in Kathua district.',
      ],
    },
    {
      id: 'other-valley-rivers',
      title: '6. Other Significant Rivers & Mountain Torrents',
      badge: 'Tributary Systems',
      content: [
        'Kishanganga (Neelum) River: Originates from Krishansar Lake near Sonamarg, flows northwards through the picturesque Gurez Valley (Bandipora), crosses the Line of Control into Pakistan-administered Kashmir, and joins the Jhelum at Domel near Muzaffarabad.',
        'Lidder River: Rises from Kolahoi Glacier (West Lidder) and Sheshnag Lake (East Lidder), meeting at Pahalgam. It powers the famous trout fishing pools of Pahalgam and joins Jhelum near Mirgund.',
        'Veshav River: Originates from high-altitude Kausarnag Lake in Pir Panjal. At Aharbal in Kulgam district, it plunges over a 25-meter sheer basalt cliff to form the famous Aharbal Waterfall.',
        'Doodhganga: Rises from Tatagoti Peak near Yusmarg. Named "River of Milk" because of the frothy white rapids foaming over boulders.',
      ],
      examPoints: [
        'Aharbal Waterfall is situated on the Veshav River in Kulgam district.',
        'Kishanganga Hydroelectric Project (330 MW) diverts water from Gurez via a 23 km headrace tunnel into the Bonar stream at Bandipora into Wular Lake.',
      ],
    },
    {
      id: 'major-lakes-jk',
      title: '7. Major Lakes of Kashmir Valley',
      badge: 'Lakes',
      content: [
        'The Kashmir Valley contains some of Asia’s most celebrated tectonic and freshwater lakes.',
      ],
      table: {
        caption: 'Premier Lakes of the Kashmir Valley',
        headers: ['Lake Name', 'District', 'Origin / Type', 'Max Depth / Area', 'Salient Characteristics'],
        rows: [
          [
            'Wular Lake',
            'Bandipora',
            'Tectonic Depression',
            'Area: ~189 sq km (varies seasonally); Depth: ~5.8 m',
            'Largest freshwater lake in India; fed and drained by River Jhelum; designated Ramsar site in 1990; contains Sultan Zain-ul-Abidin’s artificial island "Zaina Lank" built in 1443 CE.'
          ],
          [
            'Dal Lake',
            'Srinagar',
            'Post-glacial fluviatile lake',
            'Area: ~18 sq km; Average Depth: 1.5 m (Max: 6 m)',
            '"Jewel in the Crown of Kashmir". Divided into 4 distinct basins: Gagribal, Lokut Dal, Bod Dal, and Nagin. Contains two islands: Rupa Lank (Char Chinar) in Lokut Dal and Sona Lank in Bod Dal. Famous for floating gardens (Radh).'
          ],
          [
            'Manasbal Lake',
            'Ganderbal (Safapora)',
            'Tectonic / Spring fed',
            'Depth: ~13 meters (deepest lake in Kashmir)',
            'Derived from Lake Manasarovar; deepest lake in Kashmir Valley; famous for luxuriant lotus blooms in summer and Nur Jahan’s ruined Mughal garden "Darogabagh / Jharokha".'
          ],
          [
            'Nigeen Lake',
            'Srinagar (foot of Hari Parbat)',
            'Connected to Dal via Nallah Amir Khan',
            'Depth: ~6 meters',
            'Often called "Jewel in the Ring"; surrounded by willow and poplar trees; peaceful houseboat destination with crystal clear water.'
          ],
          [
            'Anchar Lake',
            'Srinagar / Ganderbal',
            'Swampy floodplain lake',
            'Connected to Nagin lake via Amir Khan Nallah',
            'Extremely deteriorated ecosystem; home to traditional boatman (Hanjis) cultivating lotus roots (Nadru).'
          ],
        ],
      },
      examPoints: [
        'Wular Lake is the largest freshwater lake in India.',
        'Manasbal Lake is the deepest lake in the Kashmir Valley (~13 meters).',
        'Char Chinar (Rupa Lank) island in Dal Lake was created by Prince Murad Bakhsh, brother of Mughal Emperor Aurangzeb.',
      ],
    },
    {
      id: 'alpine-and-jammu-lakes',
      title: '8. Alpine Lakes & Lakes of Jammu Division',
      badge: 'Alpine & Subtropical',
      content: [
        'High Altitude Alpine Lakes (Tarns): Perched between 3,000m and 4,200m elevation in the Pir Panjal and Great Himalayan ranges, fed directly by glacial snowmelt.',
      ],
      table: {
        caption: 'High-Altitude Alpine Lakes of J&K',
        headers: ['Lake Name', 'District / Location', 'Elevation', 'Geographical & Mythological Significance'],
        rows: [
          ['Gangabal Lake', 'Ganderbal (foot of Mount Harmukh)', '3,570 m', 'Sacred to Kashmiri Hindus as the "Ganga of Kashmir"; source of Kanknai stream.'],
          ['Kausarnag (Konsarnag)', 'Kulgam (Pir Panjal)', '3,962 m', 'Tortoise-shaped oligotrophic glacial lake; source of River Veshav; sacred footprint of Vishnu.'],
          ['Tarsar & Marsar Lakes', 'Pulwama / Anantnag border', '3,795 m', 'Twin almond-shaped alpine lakes; Marsar feeds Dachigam stream (Harwan reservoir).'],
          ['Sheshnag Lake', 'Anantnag (Amarnath yatra track)', '3,590 m', 'Sacred lake surrounded by seven peaks resembling the celestial serpent Sheshnaga.'],
          ['Vishansar & Kishansar', 'Ganderbal (Great Lakes trek)', '3,710 m', 'Twin glacial lakes near Sonamarg; Vishansar is source of Neelum (Kishanganga) river.'],
          ['Mansar Lake', 'Jammu / Udhampur', '666 m', 'Sub-tropical freshwater lake; sacred serpent shrine of Sheshnag; Ramsar wetland site (2005).'],
          ['Surinsar Lake', 'Jammu', '605 m', 'Twin sister lake of Mansar; associated in Mahabharata mythology with Arjuna and Babruvahana.'],
        ],
      },
      examPoints: [
        'Gangabal Lake is situated at the foot of Mount Harmukh (5,142m) in Ganderbal.',
        'The water of Marsar Lake drains into Dachigam valley and supplies drinking water to Srinagar.',
        'Mansar and Surinsar are designated Ramsar wetland sites in Jammu division.',
      ],
    },
    {
      id: 'irrigation-canals',
      title: '9. Historical & Modern Irrigation Canals of J&K',
      badge: 'Irrigation History',
      content: [
        'Irrigation canals (Kols) have transformed barren karewas into fertile paddy and saffron fields since ancient antiquity.',
      ],
      table: {
        caption: 'Prominent Canals in Jammu & Kashmir',
        headers: ['Canal Name', 'Commissioning Ruler / Builder', 'Source River', 'Command Area & District Benefitted'],
        rows: [
          ['Martand Canal', 'King Suvarna (ancient) / repaired by Zain-ul-Abidin & Dogras', 'Lidder River', 'Oldest known canal in Kashmir; irrigates the arid Martand karewa.'],
          ['Zainagir Canal', 'Sultan Zain-ul-Abidin (15th Cent.)', 'Pohru River / Lidder', 'Watered the northern karewa of Sopore (Bandipora / Baramulla).'],
          ['Ranbir Canal', 'Maharaja Pratap Singh (designed 1904)', 'Chenab River (at Akhnoor)', 'Largest and most vital canal in Jammu division; irrigates Jammu, RS Pura, and Samba.'],
          ['Pratap Canal', 'Maharaja Pratap Singh (1896)', 'Chenab River (at Akhnoor)', 'Right bank canal irrigating Khour, Jourian, and Akhnoor.'],
          ['Ravi Canal', 'Modern J&K Irrigation Dept', 'Ravi River (Thein Dam / Shahpur Kandi)', 'Designed to irrigate Kandi areas of Kathua and Samba.'],
          ['Nur Canal (Nur Kol)', 'Empress Nur Jahan (1620s)', 'Jhelum River', 'Diverted water to Shadipora and Srinagar outskirts to prevent waterlogging.'],
          ['Babul Canal (Lal Kuhl)', 'Sultan Zain-ul-Abidin', 'Sindh River', 'Irrigated pastures in Ganderbal and Srinagar.'],
        ],
      },
      examPoints: [
        'Ranbir Canal, taken out from the left bank of Chenab at Akhnoor, is the lifeline of agriculture in Jammu district.',
        'Martand Canal is the oldest canal in Kashmir Valley, first excavated by King Suvarna.',
      ],
    },
    {
      id: 'hydroelectric-power-projects',
      title: '10. Major Hydroelectric Power Projects in J&K',
      badge: 'Hydropower',
      content: [
        'Jammu & Kashmir has an estimated hydroelectric potential of over 20,000 MW, primarily on the Chenab and Jhelum river basins, developed through NHPC and the state-owned JKSPDC.',
      ],
      table: {
        caption: 'Major Operational & Under-Construction Hydro Projects',
        headers: ['Project Name', 'Capacity (MW)', 'River Basin', 'District', 'Executing Agency / Highlights'],
        rows: [
          ['Mohra Hydroelectric Project', '9 MW (originally 4 MW)', 'River Jhelum', 'Baramulla', 'First hydro project in J&K (1905), built by Maharaja Pratap Singh under engineer Major A. de Lotbiniere.'],
          ['Salal Hydroelectric Project', '690 MW (Stage I & II)', 'River Chenab', 'Reasi (Dhyangarh)', 'NHPC; first mega hydro project in J&K (completed 1987). Rock-fill dam.'],
          ['Baglihar Hydroelectric Project', '900 MW (Stage I & II)', 'River Chenab', 'Ramban (Chanderkote)', 'JKSPDC; run-of-the-river concrete gravity dam; subject of neutral expert review under IWT in 2007.'],
          ['Dul Hasti Hydro Project', '390 MW', 'River Chenab', 'Kishtwar', 'NHPC; features a 10.6 km headrace tunnel drilled under Chenab.'],
          ['Uri-I & Uri-II Hydro Projects', '480 MW + 240 MW (720 MW total)', 'River Jhelum', 'Baramulla (Uri)', 'NHPC; underground powerhouses near LOC.'],
          ['Kishanganga Hydroelectric Project', '330 MW', 'Kishanganga (Neelum)', 'Bandipora (Gurez/Bonar)', 'NHPC; inaugurated in 2018; 23.25 km trans-basin diversion tunnel.'],
          ['Ratle Hydroelectric Project', '850 MW (Under Construction)', 'River Chenab', 'Kishtwar (Drasbshalla)', 'Joint Venture (NHPC & JKSPDC); Run-of-the-River.'],
          ['Pakal Dul Hydro Project', '1,000 MW (Under Construction)', 'Marusudar River (Chenab)', 'Kishtwar', 'CVPP (Chenab Valley Power Projects); highest rockfill dam in J&K.'],
          ['Sawalkote Hydro Project', '1,856 MW (Planned)', 'River Chenab', 'Ramban / Udhampur', 'Largest planned hydroelectric installation in J&K.'],
          ['Kiru & Kwar Hydro Projects', '624 MW + 540 MW', 'River Chenab', 'Kishtwar', 'Chenab Valley Power Projects (CVPP).'],
        ],
      },
      examPoints: [
        'Mohra (1905) on River Jhelum in Baramulla was the first hydroelectric power station in Jammu & Kashmir and the second in India.',
        'Baglihar Project (900 MW) on River Chenab is the largest operational hydro project owned by the State Government agency JKSPDC.',
        'Pakal Dul (1,000 MW) is being built on the Marusudar river in Kishtwar.',
      ],
      correctionNotes: [
        'Exam Tip: Baglihar is owned by JKSPDC (State UT Power Corp), whereas Salal, Dul Hasti, Uri, and Kishanganga are central sector projects executed by NHPC.',
      ],
    },
    {
      id: 'rivers-lakes-pyqs',
      title: '11. Sample Previous Year Questions (PYQs) with Solutions',
      badge: 'Exam Practice',
      pyqs: [
        {
          question: 'The famous Aharbal Waterfall is formed by which tributary river?',
          exam: 'JKSSB FAA 2024',
          answer: 'Veshav River',
          explanation: 'The Veshav River rises from Kausarnag and falls dramatically over a basalt cliff at Aharbal in Kulgam.',
        },
        {
          question: 'In which year was the historic Indus Waters Treaty signed between India and Pakistan?',
          exam: 'JKSSB Sub-Inspector 2022',
          answer: '1960 (September 19)',
          explanation: 'The IWT was signed at Karachi by Jawaharlal Nehru and Ayub Khan, mediated by the World Bank.',
        },
        {
          question: 'Which is the deepest lake in the Kashmir Valley?',
          exam: 'JKSSB Junior Assistant 2021',
          answer: 'Manasbal Lake (~13 meters)',
          explanation: 'Manasbal Lake located in Ganderbal district is recognized as the deepest lake in the Kashmir Valley.',
        },
        {
          question: 'The first hydroelectric power station in Jammu and Kashmir was commissioned at which location?',
          exam: 'JKSSB Accounts Assistant 2020',
          answer: 'Mohra (1905) on River Jhelum',
          explanation: 'Mohra Hydroelectric station in Baramulla was commissioned in 1905 during Maharaja Pratap Singh’s reign.',
        },
      ],
    },
    {
      id: 'rivers-lakes-quick-revision',
      title: '12. Rivers & Lakes Quick Revision Table',
      badge: 'Quick Revision',
      table: {
        caption: 'Essential Hydrography Memory Points for JKSSB Aspirants',
        headers: ['Hydrological Entity', 'Key Fact / Answer'],
        rows: [
          ['Origin of River Jhelum', 'Verinag Spring (Anantnag)'],
          ['Vedic & Greek name of Jhelum', 'Vitasta (Vedic), Hydaspes (Greek)'],
          ['Prayag of Kashmir', 'Shadipora (Confluence of Jhelum and Sindh rivers)'],
          ['Origin of River Chenab', 'Confluence of Chandra and Bhaga at Tandi (HP)'],
          ['Vedic name of River Chenab', 'Asikni'],
          ['River dividing Jammu city', 'River Tawi (Surya Putri)'],
          ['Origin of River Tawi', 'Kali Kundi / Kailash Kund glacier (Bhaderwah)'],
          ['Largest freshwater lake in India', 'Wular Lake (Bandipora)'],
          ['Deepest lake in Kashmir Valley', 'Manasbal Lake (Ganderbal, ~13m)'],
          ['Island in Wular Lake', 'Zaina Lank (built by Sultan Zain-ul-Abidin in 1443)'],
          ['Two islands in Dal Lake', 'Rupa Lank (Char Chinar) in Lokut Dal, Sona Lank in Bod Dal'],
          ['Oldest Canal in Kashmir', 'Martand Canal (built by King Suvarna)'],
          ['First Hydroelectric Plant in J&K', 'Mohra (1905) on River Jhelum'],
          ['World’s highest rail arch bridge', 'Chenab Bridge (359m high) at Kauri-Bakkal in Reasi'],
        ],
      },
      examPoints: [
        'Review these 14 facts before attempting any JKSSB paper.',
      ],
    },
  ],
};

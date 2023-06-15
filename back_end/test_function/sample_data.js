account_is_hashed = false;
account = [
  {
    name: "AAAAAA",
    email: "aaaaa@gmail.com",
    password: "pass",
  },
  {
    name: "BBBBB",
    email: "bbbbb@gmail.com",
    password: "pass"

  },
  {
    name: "CCCCC",
    email: "ccccc@gmail.com",
    password: "pass"
  }
];

attraction = [
  {
    name: "Guided Street Food Tour",
    short_description:
      "A stroll to some of Hanoi's most prominent street food vendors",
    image: [
      "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/222572168.jpg?k=5f351c429055fff045356847861f726ac480e3d395192ce444fe5ab703b8cd78&o=",
    ],
    duration: {
      min_duration: 120,
      max_duration: 180,
    },
    free_cancellation_available: true,
    city: "Ha noi",
    country: "Viet Nam",
    continent: "Asia",
    category: "Tour",
    owner: "",
    pick_up_included: true,
    description: `During this private walking tour, you’ll have the chance to discover some of Hanoi’s most iconic street food dishes alongside a local guide. After meeting at your accommodation in the city’s Old Quarter, you’ll pay a visit to Hoàn Kiếm Lake, an area which is often called the heart of Hanoi. From here, you’ll peruse the city’s bustling streets on your journey to several renowned street food vendors. As you pour over the menu, you’ll get to sample dishes such as Bun Cha and Banh Cuon. Before wrapping up the tour, you’ll also get to stop for dessert and egg coffee.`,
    included: ["Hotel pickup and drop-off", "Guide services"],
    not_included: ["Transportation"],
    accessibility: [
      "Accessible to pushchairs/prams",
      "Service animals welcome",
      "Public transport links nearby",
    ],
    health_safety: ["Suitable for all fitness levels"],
    languages: ["English (UK)"],
    additional_information: `Discounted or reduced-price tickets are not available for this tour. All participants should purchase a ticket.

        Please bring your ticket with you to the attraction.
        
        Be aware that operators may cancel for unforeseen reasons.
        
        You need to be 18 years or older to book or be accompanied by an adult.
        
        Operated by Hanoi Private Tour Guide`,
    location_departure: `Pick up point
    Hanoi
    Please note that the pickup and drop-off service is available for accommodation located in Hanoi's Old Quarter. Please enter your pickup details at checkout. Please also note that hotel pickups will commence at least two hours before the scheduled tour time.`,
    itinerary_stops: [
      {
        name: "Lake of the Restored Sword (Hoan Kiem Lake)",
        admission_ticket: true,
        description: `(Schedule is flexible)
        Our tour guide will pick you up at your hotel or meeting point then we will start our Hanoi Old Quarter Walking Tour. The first destination of the tour will stop by Hoan Kiem Lake, considered the heart of Hanoi. You can observe many locals interesting activities such as playing badminton, doing exercises.`,
        duration: 30,
      },
      {
        name: "Old Quarter",
        admission_ticket: true,
        description: `Walking through the maze of bustling streets that make up Hanoi’s Old Quarter, we tempt our tastebuds with the famed Hanoi street food dishes such as Bun Cha, Banh Cuon, Noodle,etc`,
        duration: 80,
      },
      {
        name: "Old Quarter",
        admission_ticket: true,
        description: `Stop at: Old Quarter
        Free admission
        Our nextstops are at outdoor food stalls for dessert such as fresh fruit served in a cup, and famous Egg Coffee,etc`,
        duration: 60,
      },
    ],
    available: [
      {
        start: "2023-06-01",
        end: "2023-09-01",
      },
    ],
    ticket: {
      select_time: ["11:00", "11:30", "17:00", "17:30", "18:00"],
      ticket_type: [
        {
          name: "Group (max. 15 people)",
          people_per_ticket: 15,
          price: 5.13,
        },
      ],
    },
  },
  {
    name: "Guided City Sightseeing Walking Tour",
    short_description:
      "A guided walking tour to discover some of Hanoi's top attractions",
    image: [
      "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/222171388.jpg?k=5e8c66b47d003a3652ad270a965c8cf854b816db44e51c99ba83e785fd3905c0&o=",
    ],
    duration: {
      min_duration: 180,
      max_duration: 480,
    },
    free_cancellation_available: true,
    city: "Ha noi",
    country: "Viet Nam",
    continent: "Asia",
    category: "Tour",
    owner: "",
    pick_up_included: true,
    refundable: false,
    description: `On this private walking tour, you’ll be given the opportunity to discover some of the most prominent attractions in Hanoi.

    Together with a local guide, you’ll first make your way to Hoàn Kiếm Lake, which is considered by many locals to be the heart of the city. From here, you’ll visit other notable highlights such as the Ho Chi Minh Mausoleum Complex, Ho Chi Minh’s Stilt House, the Presidential Palace, Ho Chi Minh Museum and the One Pillar Pagoda, among other famous sights. Additionally, you’ll be able to explore to two well-preserved and iconic landmarks: the Temple of Literature and the National University Campus.

    Throughout this excursion, your guide will offer an array of insights into the city’s Old Quarter, as well as commentary into Hanoi’s history, culture and architecture.`,
    included: ["Hotel pickup and drop-off", "Guide services"],
    not_included: ["Transportation"],
    accessibility: [
      "Accessible to pushchairs/prams",
      "Service animals welcome",
      "Public transport links nearby",
    ],
    health_safety: ["Suitable for all fitness levels"],
    languages: ["English (UK)"],
    additional_information: `Discounted or reduced-price tickets are not available for this tour. All participants should purchase a ticket.

    Please follow the local COVID-19 guidelines and regulations in order to join the tour.

    Please bring your ticket with you to the attraction.

    Be aware that operators may cancel for unforeseen reasons.

    You need to be 18 years or older to book or be accompanied by an adult.

    Operated by Hanoi Private Tour Guide`,
    location_departure: `Pick up point
    Hanoi
    Please enter your pickup details at checkout. Please note that the pickup and drop-off service is available for accommodation located in Hanoi's Old Quarter. Please also note that pickups will commence two hours before the scheduled tour time`,
    itinerary_stops: [
      {
        name: "Lake of the Restored Sword (Hoan Kiem Lake)",
        admission_ticket: false,
        description: `(Schedule is flexible)
        Our tour guide will pick you up then we will start our Hanoi Old Quarter Walking Tour. The first destination of the tour will stop by Hoan Kiem Lake, considered the heart of Hanoi. You can observe many locals interesting activities such as playing badminton, doing exercises.`,
        duration: 30,
      },
      {
        name: "Ho Chi Minh Mausoleum",
        admission_ticket: false,
        description: `Then, we head to Ho Chi Minh Mausoleum Complex. A traffic-free area of botanical gardens, monuments, memorials and pagodas. Within the complex are Ho Chi Minh's Mausoleum, Ho Chi Minh’s Stilt House and the Presidential Palace, Ho Chi Minh Museum and the One Pillar Pagoda.`,
        duration: 60,
      },
      {
        name: "Temple of Literature & National University",
        admission_ticket: false,
        description: `Temple of Literature & National University is originally built as a university in 1070 dedicated to Confucius, scholars and sages, the building is extremely well preserved and is a superb example of traditional-style Vietnamese architecture. Visiting the Temple of Literature you will discover historic buildings from the Ly and Tran dynasties in a revered place that has seen thousands of doctors’ graduate in what has now become a memorial to education and literature.`,
        duration: 60,
      },
      {
        name: "Hoa Lo Prison",
        admission_ticket: false,
        description: `Hoa Lo Prison ironically nicknamed the ‘Hanoi Hilton’ by US prisoners of war (POWs) during the American War. Most exhibits relate to the prison’s use up to the mid-1950s, focusing on the Vietnamese struggle for independence from France.`,
        duration: 60,
      },
      {
        name: "Vietnam National Museum of History",
        admission_ticket: false,
        description: `The museum is now housing over 200,000 objects and materials which are relics of Vietnamese history flowing from pre-history to the present. Among these, many are Vietnamese antiquities and 18 are recognized as Vietnam’s national treasures.`,
        duration: 60,
      },
    ],
    available: [
      {
        start: "2023-06-01",
        end: "2023-09-01",
      },
    ],
    ticket: {
      select_time: [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "17:00",
      ],
      ticket_type: [
        {
          name: "Group (max. 10 people)",
          people_per_ticket: 10,
          price: 5,
        },
      ],
    },
  },
  {
    name: "Mekong Delta Tour with Boat Trip and Lunch",
    short_description:
      "The wonders of the scenic region and an in-depth look at local life",
    image: [
      "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/144465855.jpg?k=9a06b74759dd70f5cf6a6718c74440d9bc27d148e6d2338526b233424a63dfa1&o=",
    ],
    duration: {
      min_duration: 540,
      max_duration: 540,
    },
    free_cancellation_available: true,
    city: "Ho Chi Minh",
    country: "Viet Nam",
    continent: "Asia",
    category: "Tour",
    owner: "",
    pick_up_included: true,
    refundable: false,
    description: `On this full-day tour, you’ll explore the Mekong Delta region, moving through the stunning landscape and learning more about Vietnamese culture. You’ll visit the Vinh Trang Pagoda before boarding a motorboat for a cruise along the Tien River.

    You’ll get a look at local life as you pass the fishing port and boat-building workshop, and you’ll stop at an islet to visit a charming village. Here, you’ll enter a fruit garden brimming with tropical fruits and listen to folk music performed by the islanders. You’ll dine on a delicious lunch in the orchard garden and view the bee house and snakes.

    During the final part of your tour, you’ll take a rowboat trip on a small canal, visit a shop making coconut candy and have free time in the Ben Tre province.`,
    included: [
      "Transportation in an air-conditioned vehicle",
      "Guide services",
      "Lunch",
      "Tropical fruits",
      "Bottled water",
      "Hotel pickup and drop-off (District 1)",
    ],
    not_included: ["Tips (optional)"],
    accessibility: [
      "Public transport links nearby",
      "Infants must sit on an adult's lap",
    ],
    health_safety: ["Suitable for all fitness levels"],
    restriciton: [
      "Please arrive at least 15 minutes before the activity starts.",
    ],
    languages: ["English (UK)"],
    additional_information: `Please bring your ticket with you to the attraction.

    Be aware that operators may cancel for unforeseen reasons.

    You need to be 18 years or older to book or be accompanied by an adult.

    Vegan option available

    Operated by Viet Nam Adventure Tours JSC`,
    location_departure: `Meeting point
    123 Ly Tu Trong street, District 1, Ho Chi Minh City
    Please note that complimentary pickup and drop-off services are available from centrally located hotels in District 1. Please enter your pickup details at check-out. If your hotel is not located in the listed pickup area, please make your way to the meeting point located at the listed address at 07:45.`,
    itinerary_stops: [
      {
        name: "Vinh Trang Temple",
        admission_ticket: true,
        description: `Around 8:00am, depart from Ho Chi Minh City. Start your journey and enjoy the peaceful countryside scenery on the way to My Tho, the first stop of the day is Vinh Trang pagoda. It is a beautiful and historic temple that is worth a visit. The pagoda features intricate architecture, lush gardens, and serene surroundings, making it a perfect spot for some peace and quiet.`,
        duration: 60,
      },
      {
        name: "My Tho",
        admission_ticket: true,
        description: `After exploring the Temple, we arrive My Tho - a bustling city and a popular destination to explore the Mekong Delta. We will be taking a boat ride on the Mekong River to visit nearby islands, taste local fruits, enjoy traditional music performed by the villagers and learn about the daily life of the locals, then we take a sampan boat ride along small canals with coconut trees lining both sides.`,
        duration: 120,
      },
      {
        name: "Ben Tre",
        admission_ticket: true,
        description: `Enjoy a local lunch with Vietnamese dishes (vegan food available) After lunch, we take a boat trip to Ben Tre - a charming town that is famous for its coconut plantations, fruit orchards. You can take a leisurely bike ride through the countryside, visit a local family to learn how to make coconut candy.

        Around 3:00pm head back to Ho Chi Minh City. The drive back takes around 2 hours, giving you plenty of time to relax and reflect on your experiences of the day.`,
        duration: 120,
      },
    ],
    available: [
      {
        start: "2023-06-01",
        end: "2023-09-01",
      },
    ],
    ticket: {
      select_time: ["07:45", "08:00"],
      ticket_type: [
        {
          name: "Adult (age 10-99)",
          people_per_ticket: 1,
          price: 28,
        },
        {
          name: "Child (age 3-9)",
          people_per_ticket: 1,
          price: 25,
        },
      ],
    },
  },
  {
    name: "Half-day Tour to Sinh Village & Thuy Xuan Village",
    short_description:
      "A guided tour to learn about the folk painting industry and the production of incense",
    image: [
      "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/148210006.jpg?k=396656285b191ef77e981e543132618a2c9672651757270b082604f41308c7eb&o=",
    ],
    duration: {
      min_duration: 540,
      max_duration: 540,
    },
    free_cancellation_available: true,
    city: "Hue",
    country: "Viet Nam",
    continent: "Asia",
    category: "Tour",
    owner: "",
    pick_up_included: false,
    refundable: false,
    description: `This half-day tour from Hue will offer you the opportunity to combine a visit to two ancient villages and immerse yourself in the local culture.

    Your expert guide will pick you up at your hotel. From here, a vehicle will drive you to Sinh village, also known as Lai An village, to discover its folk painting industry and the techniques used by craftsmen specialised in this artistic discipline. You will also learn about paper art at Truc Chi Garden, a working place for different artists at which you will be able to see some products with special designs.

    Next, you will stop at the Thuy Xuan incense village. During this part of the tour, your guide will explain the process of incense production and the raw materials used. In addition, you will get to admire the numerous bamboo sticks of several colours drying in the sun along the streets. This experience will end back at your hotel in the city.`,
    whyvisit: [
      "Opportunity to immerse yourself in the local culture",
      "Visit to Sinh village to discover folk painting industry",
      "Chance to see multicoloured sticks drying in the sun",
    ],
    included: [
      "Hotel pickup and drop-off",
      "Travel insurance",
      "Admission to sites",
      "Guide services",
      "Transportation in an air-conditioned vehicle",
    ],
    not_included: ["Personal expenses", "Tips (optional)"],
    health_safety: ["Suitable for all fitness levels"],
    languages: ["English (UK)"],
    additional_information: `A minimum of two participants is required to book the tour.

    This tour can accommodate a maximum of 15 participants.

    Please bring your ticket with you to the attraction.

    Be aware that operators may cancel for unforeseen reasons.

    You need to be 18 years or older to book or be accompanied by an adult.

    Operated by HOI AN EXPRESS BUSINESS TRAVEL SERVICES COMPANY LIMITED`,
    location_departure: `Pick-up point
    Hue
    Please note that pickup is available from hotels in Hue City Centre (Vĩnh Ninh, Phú Nhuận, Phú Hội, Thuận Thành, Thuận Hoà and Phú Hoà area only). Please enter your pickup details and a contact number at checkout. Please contact the tour provider to arrange your pickup details after booking. Meet your guide at the hotel lobby. Please be ready at least 15 minutes before your scheduled pickup time.`,
    available: [
      {
        start: "2023-06-01",
        end: "2023-09-01",
      },
    ],
    ticket: {
      select_time: ["08:00", "13:30"],
      ticket_type: [
        {
          name: "2 adults (price per person) (11-99)",
          people_per_ticket: 2,
          price: 74,
        },
        {
          name: "Child (age 6-10)",
          people_per_ticket: 1,
          price: 19,
        },
        {
          name: "Infant (age 0-5)",
          people_per_ticket: 1,
          price: 0,
        },
      ],
    },
  },
  {
    name: "Admission to the London Eye",
    short_description:
      "A 30-minute ride on the London Eye to see the city's most famous landmarks",
    image: [
      "https://r-xx.bstatic.com/xdata/images/xphoto/max1200/153725961.jpg?k=7edec6d024d7e0bb9a9de2d45391c1255b8df9f51022556240e8e93c049d27da&o=",
    ],
    duration: {
      min_duration: 30,
      max_duration: 30,
    },
    free_cancellation_available: true,
    city: "London",
    country: "United Kingdom",
    continent: "Europe",
    category: "landmarks",
    owner: "",
    pick_up_included: true,
    description: `With this admission ticket, you can hop aboard the iconic London Eye for a 30-minute ride over the city.

    The observation wheel reaches a height of 135 metres, offering you a chance to savour panoramic views of London. You can spot famous city landmarks like Big Ben, Buckingham Palace, St Paul’s Cathedral, Westminster Abbey and Trafalgar Square.`,
    whyvisit: ["A thrilling bird's-eye view of the English capital"],
    included: [
      "Hotel pickup and drop-off",
      "Guide services",
      "Chance to spot prominent landmarks of the city",
      "Admire Big Ben, Buckingham Palace and St Paul’s Cathedral",
    ],
    restriction: [
      "Children under 15 years old must be accompanied by an adult.",
      "Visitors must show a valid photo ID.",
    ],
    additional_information: `Please note that attractions may close areas or exhibits at their discretion on the date of your visit.

    For all ticket holders, the number of people per capsule may vary.

    Children aged 0–2 years can enter for free.

    There are strict security procedures at the London Eye. Please note that visitors are required to undergo a non-invasive security check before boarding. You can request to be searched by an officer of the same sex.

    The following items are not permitted: alcohol, baseball bats, bicycles (including folding ones), explosives (including fireworks), guns, knives, pepper spray, pets (except for service animals), prams and buggies, sharp objects, scooters, screwdrivers and spanners, skateboards, tasers and tripods.

    No pets are allowed except for service animals.

    Please go to the London Eye ticket office to exchange your voucher for a ticket. You may be asked for identification (driver's licence, national identity card or passport). You will receive tickets for the next available time slot, but you may request a different date or time, subject to availability.

    Please bring your ticket with you to the attraction.

    Be aware that operators may cancel for unforeseen reasons.

    You need to be 18 years or older to book or be accompanied by an adult.

    Operated by Ingresso`,
    location_departure: `Pick up point
    Hanoi
    Please note that the pickup and drop-off service is available for accommodation located in Hanoi's Old Quarter. Please enter your pickup details at checkout. Please also note that hotel pickups will commence at least two hours before the scheduled tour time.`,

    available: [
      {
        start: "2023-06-01",
        end: "2023-09-01",
      },
    ],
  ticket: {
    select_time: [
      "12:30",
      "12:45",
      "13:15",
      "13:30",
      "13:45",
      "14:00",
      "14:15",
      "14:30",
      "14:45",
      "15:00",
      "15:15",
      "15:30",
      "15:45",
      "16:00",
      "16:15",
      "16:45",
    ],
    ticket_type: [
      {
        name: "Adult (age 16+)",
        people_per_ticket: 1,
        price: 32.3,
      },
      {
        name: "Child (age 3-15)",
        people_per_ticket: 1,
        price: 28.97,
      },
      {
        name: "Infant (age 0-2)",
        people_per_ticket: 1,
        price: 0,
      },
      {
        name: "Carer",
        people_per_ticket: 1,
        price: 0,
      },
    ],
  },
  },
  {
    name: "Evening Cruise at Port of Hamburg with Commentary",
    short_description:
      "Insights into the city on a cruise along the Elbe River",
    image: [
      "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/144018257.jpg?k=7bd85884e4db7acdbec520e193585ad4a13d7ec9e93fb6b3d0132688c73b2b7a&o=",
    ],
    duration: {
      min_duration: 90,
      max_duration: 90,
    },
    free_cancellation_available: true,
    city: "Hamburg",
    country: "German",
    continent: "Europe",
    category: "Tour",
    owner: "",
    pick_up_included: false,
    refundable: false,
    description: `This evening tour in Hamburg will give you the opportunity to discover the city during twilight. You’ll go on a cruise along the River Elbe and watch the city lights on the banks.

    You’ll get insights into the city during the live commentary and have the chance to see neighbourhoods such as Speicherstadt – the largest warehouse district in the world.`,
    whyvisit: [
      "Opportunity to see the city during twilight",
      "Chance to cruise through Speicherstadt",
      "Insights into Hamburg via live commentary",
    ],
    included: ["River cruise", "Live commentary"],
    not_included: ["Tips (optional)"],
    restriciton: [
      "Please arrive at least 20 minutes before the activity starts.",
    ],
    languages: ["German"],
    additional_information: `Please note that the trip through the historic Speicherstadt is subject to the tide.

    This activity is only offered in German.

    Please note that this tour is not recommended for children aged 0-4 years.

    Please bring your ticket with you to the attraction.

    Be aware that operators may cancel for unforeseen reasons.

    You need to be 18 years or older to book or be accompanied by an adult.

    Operated by GREGORS GmbH`,
    location_departure: `Evening Cruise at Port of Hamburg with Commentary
    St. Pauli-Landungsbrücken 10, Hamburg, 20359
    Arrive at bridge 10 at the Landungsbrücken. The white ticket house is located behind the stairs, on bridge 10. Show your printed ticket or the one on your mobile device to a staff member at the Maritime Circle Line ticket house to collect your stamp.`,
    available: [
      {
        start: "2023-06-01",
        end: "2023-09-01",
      },
    ],
    ticket: {
      select_time: ["21:30"],
      ticket_type: [
        {
          name: "Erwachsener 2023 - ab 16 Jahren",
          people_per_ticket: 1,
          price: 28,
        },
        {
          name: "Kind 2023 - 5 - 15 Jahre",
          people_per_ticket: 1,
          price: 14,
        },
      ],
    },
  },
  {
    name: "MJ the Musical Admission",
    short_description:
      "A ticket to watch a musical that showcases Michael Jackson’s life and works",
    image: [
      "https://q-xx.bstatic.com/xdata/images/xphoto/max1200/156812062.jpg?k=9439d3e94cf7f15976e948c1684a50ba3c12a5adeb6b232fb153dc188823495a&o=",
    ],
    duration: {
      min_duration: 90,
      max_duration: 90,
    },
    free_cancellation_available: true,
    city: "New york",
    country: "United States",
    continent: "North America",
    category: "Activities",
    owner: "",
    pick_up_included: false,
    refundable: false,
    description: `With this ticket, you will get to watch a jukebox musical that tells the story of the late 'King of Pop', Michael Jackson. Featuring amazing sets, costumes and choreography, this show will provide you with the opportunity to relive a Michael Jackson concert experience and give you insights into the performer’s artistry. You will be treated to live music and exhilarating dance performances that showcase Michael Jackson’s hits, including Beat It, Billie Jean and Thriller.`,
    whyvisit: [
      "A thrilling musical production that showcases the life of the King of Pop",
      "Live performances directed and choreographed by a Tony Award winner",
      "Music featuring hits such as the Man in the Mirror and Smooth Criminal",
    ],
    included: ["Admission"],
    restriciton: [
      "Children under 12 years old must be accompanied by an adult.","Visitors must show a valid photo ID.","Visitors must show a valid photo ID.",
    ],
    languages: ["English (US)"],
    additional_information: `Please refer to the seating map in the photo gallery before booking your tickets. You will get the best available seats for your chosen category.

    Please note that groups may not be seated together.

    Children may be asked to present a photo ID as proof of age. Please bring a school ID or any valid ID.

    Please bring your ticket with you to the attraction.

    Be aware that operators may cancel for unforeseen reasons.

    You need to be 18 years or older to book or be accompanied by an adult.

    Operated by Broadway Inbound`,
    location_departure: `MJ the Musical Admission
    Neil Simon Theatre - 250 West 52nd Street, New York, NY, 10019`,
    available: [
      {
        start: "2023-06-01",
        end: "2023-09-01",
      },
    ],
    ticket: {
      select_time: ["19:00"],
      ticket_type: [
        {
          name: "Front Orchestra Sides/Mid Orchestra Sides",
          people_per_ticket: 1,
          price: 143.92,
        },
        {
          name: "Front Orchestra/Mid Orchestra/Front Mezzanine",
          people_per_ticket: 1,
          price: 177.17,
        },
      ],
    },
  },
];

module.exports = { account, attraction, account_is_hashed };

const arr = [
    
    {
        "_id": "648c88adbfab518de4a42b6d",
        "studentName": "  Rokaya Hassan Naguip",
        "studentNumber": "01102816862",
        "parentNumber": " 01145683544",
        "grade": "sec2s",
        "time": "(المنشية) (الساعة ٥) (السبت)"
    },
    {
        "_id": "648c89f0bfab518de4a42b70",
        "studentName": "زياد وليد حامد احمد عزب ",
        "studentNumber": "01272657794",
        "parentNumber": "01276581799",
        "grade": "prep3",
        "time": "( الحكماء ) (الساعة ١) (الاحد)"
    },
    {
        "_id": "648c8b57bfab518de4a42b71",
        "studentName": "شهد هاني فتحي ",
        "studentNumber": "01126121468",
        "parentNumber": "01150440880",
        "grade": "sec2s",
        "time": "(القومية) (الساعة ٥) (الاحد)"
    },
    {
        "_id": "648c8c4ebfab518de4a42b72",
        "studentName": "تسنيم خالد الفولي",
        "studentNumber": "٠١٠١٥٧٧٣٩٦٣",
        "parentNumber": "٠١٠٠٢٩٢٢٤٣٨",
        "grade": "sec2s",
        "time": "(المنشية) (الساعة ٥) (السبت)"
    },
    {
        "_id": "648c8df5cae69d3d7e32ca6f",
        "studentName": "عمار اشرف محمد ",
        "studentNumber": "01275661704",
        "parentNumber": "01288920506",
        "grade": "prep3",
        "time": "(الحكماء) (الساعة ١) (الاحد)"
    },
    {
        "_id": "648c8f8ccae69d3d7e32ca71",
        "studentName": "كنزى احمد محمود ",
        "studentNumber": "٠١٠٣٠٠٩٢٠٣٢",
        "parentNumber": "٠١٠١٩٨٤٨٦٨٨",
        "grade": "sec2s",
        "time": "(الحكماء) (الساعة ٦) (السبت)"
    },
    {
        "_id": "648cb30ccae69d3d7e32ca75",
        "studentName": "ردينه ابراهيم محمود احمد ",
        "studentNumber": "01204649813",
        "parentNumber": "01202239840",
        "grade": "sec2s",
        "time": "(المنشية) (الساعة ٥) (السبت)"
    },
    {
        "_id": "648cb91dcae69d3d7e32ca76",
        "studentName": "حنين عبدالرحمن نحله",
        "studentNumber": "01096000735",
        "parentNumber": "01030737797",
        "grade": "sec3",
        "time": "(القومية) (الساعة ٧) (يوميا)"
    },
    {
        "_id": "648cc0afcae69d3d7e32ca77",
        "studentName": "mohamed ashraf ahmed ",
        "studentNumber": "01018440285",
        "parentNumber": "01097597082",
        "grade": "sec2s",
        "time": "(المنشية) (الساعة ٥) (السبت)"
    },
    {
        "_id": "648cc88aa63f10f92b45ed0d",
        "studentName": "أمل وليد صابر مصطفى أحمد عرابي ",
        "studentNumber": "01023175422",
        "parentNumber": "01507065749",
        "grade": "sec2l",
        "time": "(الحكماء) (الساعة ٦) (السبت)"
    },
    {
        "_id": "648ccce4a63f10f92b45ed0e",
        "studentName": "احمد رجب فتحي",
        "studentNumber": "01202147218",
        "parentNumber": "01279268198",
        "grade": "sec2l",
        "time": "(القومية) (الساعة ٥) (الاحد)"
    },
    {
        "_id": "648cd8f2a63f10f92b45ed0f",
        "studentName": "مريم محمد عبد المطلب ",
        "studentNumber": "01127994892",
        "parentNumber": "01222299807",
        "grade": "prep3",
        "time": "(المنشية) (الساعة ١) (السبت)"
    },
    {
        "_id": "648cda66a63f10f92b45ed10",
        "studentName": "بسمله ماهر عبدالرحمن ",
        "studentNumber": "01289020167",
        "parentNumber": "01123762260",
        "grade": "prep3",
        "time": "(المنشية) (الساعة ١) (السبت)"
    },
    {
        "_id": "648ce2f4a63f10f92b45ed11",
        "studentName": "حنين اشرف محمد سامي",
        "studentNumber": "01146191259",
        "parentNumber": "01154883458",
        "grade": "prep3",
        "time": "(المنشية) (الساعة ١) (السبت)"
    },
    {
        "_id": "648ce307a63f10f92b45ed12",
        "studentName": "محمد احمد اللبان",
        "studentNumber": "٠١٢٠٣٣٣٤٨٩",
        "parentNumber": "٠١٢٨٤٩٩٣٠٠٠",
        "grade": "prep2",
        "time": "(الحكماء) (الساعة ٧) (الاحد)"
    },
    {
        "_id": "648cea25a63f10f92b45ed13",
        "studentName": "مستر احمد السيد فلسفة ",
        "studentNumber": "01128798162",
        "parentNumber": "01211638344",
        "grade": "prep1",
        "time": "(الحكماء) (الساعة ٦) (الاحد)"
    },
    {
        "_id": "648ceaf3a63f10f92b45ed14",
        "studentName": "اياد محمد ابراهيم",
        "studentNumber": "01282915425",
        "parentNumber": "01281280296",
        "grade": "prep1",
        "time": "(الحكماء) (الساعة ٦) (الاحد)"
    }
];

  
  // Create a new array by sorting the objects based on studentName
  const sortedArray = arr.sort((a, b) => {
    const nameA = a.studentName.toLowerCase();
    const nameB = b.studentName.toLowerCase();
  
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });
  
  
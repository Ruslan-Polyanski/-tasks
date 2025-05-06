() => {
  //   Удалить все вхождения элемента из массива четырьмя разными способами.

  const array = ["1", 2, 3, "4", 5, 3, "6"];
  const elementToRemove = 3;

  // 1
  const removeElement1 = <T>(data: T[], elementToRemove: T): T[] => {
    const result: T[] = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i] !== elementToRemove) result.push(data[i]);
    }

    return result;
  };

  console.log(removeElement1(array, elementToRemove));

  // 2
  const removeElement2 = <T>(data: T[], elementToRemove: T): T[] => {
    const result: T[] = [];

    data.forEach((item) => {
      item !== elementToRemove && result.push(item);
    });

    return result;
  };

  console.log(removeElement2(array, elementToRemove));

  // 3
  const removeElement3 = <T>(data: T[], elementToRemove: T): T[] => {
    return data.filter((item) => item !== elementToRemove);
  };

  console.log(removeElement3(array, elementToRemove));

  // 4
  const removeElement4 = <T>(data: T[], elementToRemove: T): T[] => {
    return data.reduce((acc: T[], item) => {
      if (item !== elementToRemove) acc.push(item);
      return acc;
    }, []);
  };

  console.log(removeElement4(array, elementToRemove));
};

() => {
  //   Удалить n элемент из массива четырьмя разными способами.

  const array = ["1", 2, 3, "4", 5, 7, "6"];
  const elementToRemove = 6;

  // 1
  const removeElement1 = <T>(data: T[], elementToRemove: number): T[] => {
    const result: T[] = [];
    const currentIndex = elementToRemove - 1;

    for (let i = 0; i < data.length; i++) {
      if (i !== currentIndex) result.push(data[i]);
    }

    return result;
  };

  console.log(removeElement1(array, elementToRemove));

  // 2
  const removeElement2 = <T>(data: T[], elementToRemove: number): T[] => {
    const currentIndex = elementToRemove - 1;

    return [...data.slice(0, currentIndex), ...data.slice(currentIndex + 1)];
  };

  console.log(removeElement2(array, elementToRemove));

  // 3 с мутацией
  const removeElement3 = <T>(data: T[], elementToRemove: number): T[] => {
    const currentIndex = elementToRemove - 1;

    return [...data.splice(0, currentIndex), ...data.splice(1)];
  };

  console.log(removeElement3(array, elementToRemove));

  // 4
  const removeElement4 = <T>(data: T[], elementToRemove: number): T[] => {
    const currentIndex = elementToRemove - 1;

    return data.reduce((acc: T[], item, index) => {
      currentIndex !== index && acc.push(item);

      return acc;
    }, []);
  };

  console.log(removeElement4(array, elementToRemove));
};

() => {
  // Собрать объект из массива массивов при помощи reduce

  const data = [
    ["name", "John"],
    ["age", 30],
    ["city", "New York"],
  ];

  type TData = typeof data;
  type TReturnData = Record<string, string | number>;

  const getObjectFromArrays = (data: TData): TReturnData => {
    return data.reduce((acc: TReturnData, item) => {
      acc[item[0]] = item[1];
      return acc;
    }, {});
  };

  console.log(getObjectFromArrays(data));
};

() => {
  // Найти сумму всех чисел в массиве, включая вложенные массивы и приведенные строки
  // двумя вариантами

  const nestedArray = [1, [2, "3"], [4, [5, 6]], "7"];

  type TData = TData[] | number | string;

  // 1
  const getSum = (data: TData): number => {
    const resultArr: number[] = [];

    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (typeof item === "number") {
          resultArr.push(item);
          return;
        }

        if (typeof item === "string") {
          resultArr.push(+item);
          return;
        }

        if (Array.isArray(item)) {
          const result = getSum(item);
          resultArr.push(result);
          return;
        }
      });
    }

    return resultArr.reduce((acc, item) => {
      return acc + item;
    }, 0);
  };

  console.log(getSum(nestedArray));

  // 2
  const getSum2 = (data: TData, result: { sum: number }): number => {
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (typeof item === "number") {
          result.sum += item;
          return;
        }

        if (typeof item === "string") {
          result.sum += +item;
          return;
        }

        if (Array.isArray(item)) {
          getSum2(item, result);
        }
      });
    }

    return result.sum;
  };

  console.log(getSum2(nestedArray, { sum: 0 }));
};

() => {
  // Преобразовать вложенный объект в плоский как в примере

  // {
  //     'user.name': 'Alice',
  //     'user.contact.email': 'alice@example.com',
  //     'user.contact.phone': '123-456-7890',
  //     'user.contact.age': '30',
  //     'location.city': 'New York',
  //     'location.zip': '10001'
  //   }

  const nestedObject = {
    user: {
      name: "Alice",
      contact: {
        email: "alice@example.com",
        phone: "123-456-7890",
        age: 30,
      },
    },
    location: {
      city: "New York",
      zip: "10001",
    },
  };

  type TData = {
    [key in string]: TData | string | number;
  };

  type TReturnData = Record<string, string>;

  const getFlatObject = (
    data: TData,
    currentPath = "",
    resultObject: TReturnData
  ): TReturnData => {
    for (const key in data) {
      if (typeof data[key] === "string") {
        resultObject[`${currentPath}.${key}`] = data[key];
      }
      if (typeof data[key] === "number") {
        resultObject[`${currentPath}.${key}`] = "" + data[key];
      }
      if (typeof data[key] === "object" && data[key] !== null) {
        if (!currentPath) {
          getFlatObject(data[key], key, resultObject);
        } else {
          getFlatObject(data[key], `${currentPath}.${key}`, resultObject);
        }
      }
    }

    return resultObject;
  };

  console.log(getFlatObject(nestedObject, "", {}));
};

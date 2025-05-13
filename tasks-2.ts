() => {
  // Задача 1
  // В этом примере есть ошибки или недочеты, которые нужно исправить или улучшить.

  // Выведите все логи при 'положительном' исходе fetchData в правильной последовательности.
  // Обработка ошибок должна быть более правильной, как если бы весь код был внутри try-catch.
  // Использование async/await вместо then/catch там, где это возможно.
  // Убедиться, что ошибки, выбрасываемые внутри setTimeout, правильно обрабатываются.

  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = 0.4 > 0.5;
        if (success) {
          resolve("Данные успешно получены");
        } else {
          reject("Ошибка при получении данных");
        }
      }, 1000);
    });
  }

  function processData() {
    try {
      fetchData()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Обработка ошибки в then-catch:", error);
        })
        .finally(() => {
          console.log("Завершение обработки fetchData");
        });

      setTimeout(() => {
        throw new Error("Ошибка после тайм-аута");
      }, 5000);
    } catch (error) {
      console.error("Ошибка в try-catch:", error);
    }
  }

  async function asyncProcess() {
    try {
      const data = await fetchData();
      console.log("Async/Await получены данные:", data);

      throw new Error("Искусственная ошибка в async");
    } catch (error) {
      console.error("Обработка ошибки в asyncProcess:", error);
    } finally {
      console.log("Финализ в asyncProcess");
    }
  }

  processData();
  asyncProcess();

  let count = 0;
  const intervalId = setInterval(() => {
    console.log("Interval tick:", ++count);
    if (count >= 3) {
      clearInterval(intervalId);
      console.log("Interval остановлен");
    }
  }, 1000);
};

() => {
  // Решение задачи 1

  //   "Данные успешно получены"
  //   "Завершение обработки fetchData"
  //   "Async/Await получены данные: Данные успешно получены"
  //   "Обработка ошибки в asyncProcess: Искусственная ошибка в async"
  //   "Финализ в asyncProcess"
  //   "Interval tick: 1"
  //   "Interval tick: 2"
  //   "Interval tick: 3"
  //   "Interval остановлен"
  //   "Ошибка после тайм-аута"

  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = 0.4 > 0.5;
        if (success) {
          resolve("Данные успешно получены");
        } else {
          reject("Ошибка при получении данных");
        }
      }, 1000);
    });
  }

  async function fetchDataWithProcessing() {
    try {
      const data = await fetchData();
      console.log(data);
    } catch (error) {
      console.error("Обработка ошибки в then-catch:", error);
    } finally {
      console.log("Завершение обработки fetchData");
    }
  }

  async function processData() {
    try {
      await fetchDataWithProcessing();
      await new Promise((res, rej) => {
        setTimeout(() => {
          rej("Ошибка после тайм-аута");
        }, 5000);
      });
    } catch (error) {
      console.error("Ошибка в try-catch:", error);
    }
  }

  async function asyncProcess() {
    try {
      const data = await fetchData();
      console.log("Async/Await получены данные:", data);
      throw new Error("Искусственная ошибка в async");
    } catch (error) {
      console.error("Обработка ошибки в asyncProcess:", error);
    } finally {
      console.log("Финализ в asyncProcess");
    }
  }

  processData();
  asyncProcess();

  let count = 0;
  const intervalId = setInterval(() => {
    console.log("Interval tick:", ++count);
    if (count >= 3) {
      clearInterval(intervalId);
      console.log("Interval остановлен");
    }
  }, 1000);
};

() => {
  // Задача 2
  // Напишите асинхронную функцию loadUserData, которая делает следующее:

  // Внутри вызывает другую функцию fetchUser, которая возвращает промис, сразу же успешно разрешающийся с объектом пользователя { id: 1, name: "John" } через 1 секунду.
  // После получения данных, выводит их в консоль.
  // Если при вызове fetchUser произойдет ошибка (например, выбросится исключение), она должна быть поймана и обработана.
  // После обработки данных или ошибки, должна выполниться финальная часть, где выводится сообщение "Загрузка завершена".

  // Важное условие:
  // Внутри fetchUser нужно явно выбросить ошибку с помощью throw new Error("Ошибка загрузки пользователя"), чтобы симулировать ошибку.
  // Ваша задача — реализовать loadUserData так, чтобы она корректно обрабатывала как успешный случай, так и ошибочный.
  // Примените типизацию

  //   Решение задачи 2

  type TUser = { id: number; name: string };

  async function loadUserData(callBack: () => Promise<TUser>) {
    console.log("Загрузка начата");
    callBack()
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => console.log("Загрузка завершена"));
  }

  function fetchUser(isErrer: boolean): Promise<TUser> {
    return new Promise((res, rej) => {
      if (isErrer) throw new Error("Ошибка загрузки пользователя");
      setTimeout(() => {
        res({ id: 1, name: "John" });
      }, 1000);
    });
  }

  loadUserData(() => fetchUser(true));
};

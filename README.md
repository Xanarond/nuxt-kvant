Цель: Разработать базу данных "КВАНТ" для учета жидкокристаллических (ЖК) панелей, содержащую актуальные данные о материалах и историю перемещений.

Взаимодействие:
    Разделы: Координатор, Инспекция, Кладовщики, Ремонт.
    Авторизация: Реализовать механизм авторизации для четырех подразделений, обеспечивая соответствующие права доступа.

Проект включает в себя ряд технических решений и функциональных возможностей, направленных на учет и управление жидкокристаллическими (ЖК) панелями в рамках системы "КВАНТ". В качестве технологической основы использованы Nuxt.js, Express.js, PostgreSQL и ORM Sequelize. Основной акцент сделан на обеспечение безопасности, эффективности и удобства использования.
    
1.	Авторизация и Ролевая аутентификация:
-	Разработан механизм аутентификации с использованием ролей пользователей.
-	Каждому типу пользователя (Координатор, Инспекция, Кладовщики, Ремонт) предоставлены соответствующие права доступа.
2.	Уникальные таблицы для разных типов пользователей:
-	Реализовано создание уникальных таблиц для каждой роли пользователей, что позволяет более точно управлять данными о перемещении панелей.
3.	Учет "движения" панелей:
-	Разработан функционал для учета перемещения ЖК панелей между различными подразделениями.
-	Обеспечено точное отслеживание местоположения панелей в реальном времени.
4.	Интеграция загрузки данных из файлов Excel:
-	Реализован механизм загрузки данных из файлов Excel.
-	Этот функционал значительно упрощает и ускоряет внесение информации в систему.
5.	Архивная история перемещений:
-	Создана функция хранения архивной истории перемещений панелей.
-	Это позволяет производить более глубокий анализ данных и выявлять тренды.
6.	Оптимизация учета процессов:
-	Проект позволяет более эффективно управлять, отслеживать и анализировать движение ЖК панелей внутри системы "КВАНТ".
Технологическая стек:
-	Frontend: Nuxt.js
-	Backend: Express.js
-	База данных: PostgreSQL
-	ORM: Sequelize

Проект представляет собой полноценную систему учета и управления данными о ЖК панелях, обеспечивая авторизацию, точное отслеживание перемещений и возможность загрузки данных для более удобной работы пользователей разных ролей.

Превью версия находится по ссылке http://92.63.98.23:8080/. Данные учетных записей для теста представлены ниже:

| Роль       | Логин       | Пароль    | Возможности                                                                                                                                                                     |
|------------|-------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Админ      | admin       | 123       | Полный доступ ко всем функциональным возможностям системы. Управление пользователями, настройками и данными. Загрузка данных о панелях из файлов Excel.|
| Инспекция   | insp   | 123    | Загрузка данных о панелях из файлов Excel.  Проверка и подтверждение перемещения панелей. Просмотр текущей информации о панелях. Полный доступ к архиву и истории перемещений.                   |
| Кладовщик   | stock | 123  | Управление перемещением панелей в рамках склада и отдела. Полный доступ к архиву и истории перемещений. |
| Ремонт      | repa     | 123    | Отметка о неисправностях и ремонте панелей. Обновление информации о состоянии панелей. Полный доступ к архиву и истории перемещений.|  
________________________________________________________________________________________________________________________________________________________________________________

Objective: To develop a database "QUANTUM" for accounting for liquid crystal (LCD) panels, containing up-to-date data on materials and the history of movements.

Interaction:
Sections: Coordinator, Inspection, Storekeepers, Repair.
Authorization: Implement an authorization mechanism for four departments, providing appropriate access rights.

The project includes a number of technical solutions and functionality aimed at accounting and management of liquid crystal (LCD) panels within the "QUANTUM" system. Nuxt is used as a technological basis.js, Express.js, PostgreSQL and ORM Sequelize. The main focus is on ensuring safety, efficiency and usability.

1. Authorization and Role authentication:
- An authentication mechanism using user roles has been developed.
- Each type of user (Coordinator, Inspection, Storekeepers, Repair) is granted the appropriate access rights.
2. Unique tables for different types of users:
- The creation of unique tables for each user role is implemented, which allows you to more accurately manage data on the movement of panels.
3. Accounting for the "movement" of panels:
- A functional has been developed to account for the movement of LCD panels between different divisions.
- Provides accurate tracking of the location of panels in real time.
4. Integration of data loading from Excel files:
- The mechanism of loading data from Excel files is implemented.
- This functionality greatly simplifies and speeds up the introduction of information into the system.
5. Archival history of movements:
- The function of storing the archived history of panel movements has been created.
- This allows for deeper data analysis and identification of trends.
6. Process accounting optimization:
- The project allows you to more effectively manage, monitor and analyze the movement of LCD panels inside the KVANT system.
Technology stack:
- Frontend: Nuxt.js
- Backend: Express.js
- Database: PostgreSQL
- ORM: Sequelize

The project is a full-fledged system of accounting and data management of LCD panels, providing authorization, accurate tracking of movements and the ability to upload data for more convenient work of users of different roles.

The preview version is available at the link http://92.63.98.23:8080 /. The account details for the test are presented below:
| Role | Login | Password | Features |
|------------|-------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Admin | admin | 123 | Full access to all the functionality of the system. Manage users, settings and data. Loading panel data from Excel files.|
| Inspection | insp | 123 | Loading panel data from Excel files. - Checking and confirming the movement of panels. View current panel information. Full access to the archive and the history of movements. |
| Storekeeper | stock | 123 | Managing the movement of panels within the warehouse and department. Full access to the archive and the history of movements. |
| Repair | repa | 123 | A note about malfunctions and repair of panels. - Updating information about the status of panels. Full access to the archive and the history of movements.|


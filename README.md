# Movie-Server

## 프로젝트 소개

- 이번 프로젝트는 영화 예매 사이트로, 동시성 제어와 ORM을 사용하여 데이터베이스를 설계하고 구현했습니다.
- **동시성 제어**: 좌석 예약 중복 방지를 위해 DB 트랜잭션과 락을 활용하여 안전한 데이터 처리를 구현.
- **ORM**: Sequelize를 통해 효율적인 데이터베이스 연동 및 모델링을 구현.

## 제한사항

1. 초기 범위를 명확히 하기 위해 영화관은 한 개로 제한.
2. 좌석 타입은 하나로 설정.
3. 좌석 지정 예약 기능은 포함하지 않음.

## 개발 환경

- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB): 백엔드 프레임워크로 라우팅과 미들웨어를 처리.
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) : ORM으로 MySQL 데이터베이스 연동 및 쿼리 작성.
- ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) : MySQL 데이터베이스 연동 
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) : 사용자 인증 및 권한 부여. 

## 폴더 구조

📦src  
 ┣ 📂config - 환경 설정 파일  
 ┣ 📂controllers - 비즈니스 로직 처리  
 ┣ 📂middlewares - 요청/응답 흐름 제어  
 ┣ 📂models - 데이터베이스 스키마 정의  
 ┣ 📂routes - API 라우팅 설정  
 ┗ 📜app.js - Express 서버 초기화  

## 데이터베이스 구조 
![movie](https://github.com/user-attachments/assets/b51fdc83-36a4-4421-b588-82ccc8d41f51)

## 향후 개선 사항

1. 영화관별 정보와 좌석 배치 생성 기능 추가.
2. Redis를 활용한 좌석 예약 동시성 제어.
3. 좌석 등급별 가격 설정 기능 추가.
4. 관리자 페이지 구현으로 영화, 상영관 관리 효율화.

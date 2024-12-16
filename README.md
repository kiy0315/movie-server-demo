# Movie-Server
영화 예매를 예로 들어 동시성 제어와 ORM에 대한 학습을 하는 서버를 구현
# 프로젝트 빌드

## .env 추가

```
moive-demo
└─src
    └──config
        └─.env
```

## 제한사항
1. 영화관은 한 개의 영화관으로 제한을 둔다.
2. 최대 좌석의 개수는 영화관 DB에 들어간다.
3. 좌석의 타입은 하나이다.

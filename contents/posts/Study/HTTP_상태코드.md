---
title: "HTTP"
description: "HTTP의 상태코드에 대해 공부한 기록을 남깁니다."
date: 2022-09-02
update: 2022-09-02
series: 'CS'
tags:
  - TIL
  - Network
  - HTTP
---

## 1. 2xx Success
- **200** : 성공
- **201** : 성공 + 새로운 리소스가 생성됨. 새롭게 생성된 리소스의 주소를 `Location` 헤더에 담아 보낸다.
- **202** : 요청이 접수되었으나, 당장 처리하지 않음 (ex : 배치)
- **204** : 서버가 요청을 성공적으로 수행했지만, 응답에 보낼 데이터가 없음. (ex: 웹문서 편집기 자동저장)

## 2. 3xx Redirection
웹브라우저는 `3xx 응답 + Location 헤더`의 응답이 오면 해당주소로 자동이동한다.
이 때 응답주소에 따라 **영구적 리다이렉션**, **일시적 리다이렉션** , **특수 리다이렉션**으로 구분된다.
- 영구적 리다이렉션(301, 308) : 특정 리소스의 URI가 영구적으로 리다이렉트 된다.
> ##### 301 Moved Permanently 
> 실무에 많이 쓰임. 새로고침 시 요청이 GET으로 변경되고, 본문이 제거 될 수 있음.<br/>
이용자는 입력을 다시하는 경험을 할 수 있음. 하지만, 보통 입력하는 폼 자체가 모두 변경되기 때문에, 사용자는 체감을 거의하지 못함.
> ##### 308 Parmanent Redirect
> 새로고침 시 요청을 POST로 변경하고, 본문을 유지함.

- 일시적 리다이렉션(302, 307, 303): 특정 리소스의 URI가 일시적으로 리다이렉트 된다.
> ##### 302 Found
> 새로고침 시 요청이 GET으로 변경되고, 본문이 제거될 수 있음
> ##### 307 Temporary Redirect
> 302와 기능은 같으나, 새로고침 시 요청메서드와 본문을 이전과 동일하게 유지함.(요청메서드 변경X)
> ##### 303 
> 302와 기능은 같으나, 새로고침 시 요청메서드를 **무조건** GET으로 변경됨.
>> ###### PRG(POST/Redirect/GET) - 일시적 리다이렉션
>> PRG 사용으로 중복주문상황을 막을 수 있다.
PRG를 사용하지 않은 상황에선 주문완료이후 유저가 새로고침을 했을 때, 동일 POST 요청이 들어가므로, 의도치않게 동일 주문이 1개 더 생기는 상황이 발생 할 수 있음
PRG를 사용하면, 리다이렉트 후 보여진 화면에서 GET만  호출되기 때문에, 유저가 새로고침을해도 동일주문이 생성되지 않음.

- 특수 리다이렉션(300, 304) : 결과대신 캐시를 이용한다.
> ##### 300 Multiple chioce 
> 요청에 가능한 응답이 두 개 이상 있음을 나타냄 사용자 에이전트 또는 사용자는 둘 중 하나를 선택해야 함. 응답 중 하나를 선택하는 표준화된 방법이 없기 때문에 이 응답 코드는 거의 사용되지 않음. 서버가 원하는 것을 선택하면 Location 헤더를 생성해야함.
> ##### 304 Not Modified
> 주로, GET, HEAD 요청 시 사용한다.
서버가 클라이언트에게 캐시가 만료되지 않았기 때문에 클라이언트에 저장된 캐시를 사용할 수 있도록 유도한다. 응답에 메시지 바디를 포함하면 안된다.

## 3. 4xx Client Error
오류의 원인이 클라이언트에 있기에, 같은 요청을 보냈을 시 100%실패함.
> ##### 400 Bad Request
클라이언트가 요청내용(파라미터, 메시지)을 다시 검토하고 보내야함.
> ##### 401 Unauthorized
클라이언트가 해당리소스에 대한 인증이 필요함. 401 오류 발생시에 응답에 WWW-Authenticate 헤더와 함께 인증방법을 성명해야한다.
>> - Authentication : 인증(로그인)이 필요
>> - Authorization : 인가(권한 부여)가 필요
> ##### 403 Forbidden
요청을 이해했지만, 권한이 없어 접근이 불가함.
> ##### 404 Not Found
요청리소스를 서버에서 찾을 수 없거나, 클라이언트가 권한이 없는 리소스에 요청을 보냈는데, 그 리소스를 숨기고 싶을때

## 4. 5xx Server Error
> ##### 500 Internal Server Error
서버 내부문제로 오류발생
> ##### 503 Service Unavalidble
서버가 일시적인 과부하 또는 예정된 작업을 요청을 처리할 수 없음. Retry-After 헤더로 얼마 뒤에 복구 되는지 보낼 수 있음. 

## !중요!
500에러는 정말 서버에 문제가 있을 때 내는 것이기 때문에, 비즈니스 로직 상 발생한 문제에 대해서 500보단 2xx, 4xx대 코드로 해결해야함.

---
title: "프로토타입에 관하여"
description: ""
date: 2022-08-30
update: 2022-08-30
series: 'JAVASCRIPT'
tags:
  - TIL
  - Javascript
  - prototype
---

## prototype
원형을 의미합니다.
원형의 속성을 조회하고 싶다면 아래와 같이 조회하면 된다.
```javascript
Object.prototype // {...}
```
하지만 new 키워드를 통해서 만든 **복제품** 에게는 원형의 속성을 조회할 수 없다.
예를 들어 아래의 코드에서는 prototype 이 undefined 로 동작한다.
```javascript
const obj = new Object()
obj.prototype // undefined
```

## [[Prototype]]
원형의 속성의 주소를 저장하고 있는 내부 속성인 `[[Prototype]]` 을 이용하여, 자식들에게 할당한다.
조회는 `__proto__` 혹은 `getPrototypeOf()`을 이용하여 접근가능하다.
```javascript
const Foo = {
  name : 'foo'
}

const Bar = {
  __proto__ : Foo
}

const Coo = Object.create(Bar)

Bar.name // 1. foo
Coo.name // 2. foo
```
Bar와 Coo에는 직접적인 name이라는 프로퍼티가 할당되어 있지않다. 하지만, 어떻게 name이라는 속성에 접근할 수 있었을까?
name을 조회하기 위해서 자바스크립트 엔진은 현재 인스턴스에 name이란게 없다면, 내부속성인 `[[Prototype]]` 을 순차적으로 조회하며 name이라는 속성이 있는지 조회한다.

아래는 Bar.name 시 foo가 출력되는 순서이다.
> 1. Bar.name -> 없음
> 2. Bar.`[[Prototype]]`.name (=Foo.name) -> ***있음!***
> 3. foo 출력

아래는 Coo.name 시 foo가 출력되는 순서이다.
> 1. Coo.name -> 없음
> 2. Coo.`[[Prototype]]`.name (=Bar.name) -> 없음
> 3. Coo.`[[Prototype]]`.`[[Prototype]]`.name (=Foo.name) -> ***있음!***
> 4. foo 출력

실제로 `[[Prototype]]` 이 쓰이진 않고 위에서 언급한 것 처럼 `__proto__` 혹은 `getPrototypeOf()`를 이용해 조회할 수 있다.

그렇다면 아래의 상황에서는 어떻게 동작할까? 
```javascript
const Foo = {
  name : 'foo'
}

const Bar = {
  __proto__ : Foo
}

const Coo = Object.create(Bar)

Bar.name // 1. foo

Coo.name = 'coo' 

Foo.name // 2. ?
Bar.name // 3. ? 
Coo.name // 4. ? 
```

정답은 
> 2. foo
> 3. foo 
> 4. coo 
이다. 

2, 3의 동작은 위와 같지만, 4의 동작이 조금 달라진다.
> 1. Coo.name -> 있음
> 2. coo 출력

새롭게 name을 자식에 할당함으로서, `[[Prototype]]`을 조회하지 않고, 곧바로 name을 가져올 수 있었다.

## 프로토타입 체인
위의 과정에서 아래와 같은 과정을 거쳤다.
Coo.`[[Prototype]]`.name (=Bar.name) 
Coo.`[[Prototype]]`.`[[Prototype]]`.name (=Foo.name)

이 처럼 없는 속성을 계속 연결된 `[[Prototype]]`주소를 통해 찾아내려가는 현상이 마치 체인처럼 이어졌다고하여, **프로토타입 체인** 이라고 명명한다.

## constructor
constructor는 new 키워드를 이용하여 생성된 인스턴스가 자신을 낳은 주체가 무엇인지 표현하기 위해 사용되는 것이다.
```javascript
const array = new Array()
array.constructor // function Array

function Foo () {}
const foo = new Foo()
foo.constructor // function Foo

.
.
.
```

### 참고
https://tecoble.techcourse.co.kr/post/2021-06-14-prototype/
https://ko.javascript.info/function-prototype
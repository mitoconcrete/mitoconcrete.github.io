---
title: "이벤트 버블링/캡쳐링"
description: ""
date: 2022-08-29
update: 2022-08-29
series: 'JAVASCRIPT'
tags:
  - TIL
  - Javascript
  - DOM Event
---

## 1. 버블링 정의
> 한 요소에 이벤트가 발생하면, 이 요소에 할당된 핸들러가 동작하고, 이어서 부모 요소의 핸들러가 동작합니다. 가장 최상단의 조상 요소를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작하는 현상.

<img src="https://ko.javascript.info/article/bubbling-and-capturing/event-order-bubbling.svg" width="300" alt="[출처]javascript korea"></img>

```html
<div id="a">
    <div id="b">
        <div id="c" onclick="handler">
        </div>
    </div>
</div>
```

## 2. 캡쳐링 정의
> 이벤트가 상위에서 하위로 전달되며 핸들러를 실행하는 현상.

<img src="https://ko.javascript.info/article/bubbling-and-capturing/eventflow.svg" width="300" alt="[출처]javascript korea"></img>

```html
<div id="a">
    <div id="b">
        <div id="c" onclick="handler">
        </div>
    </div>
</div>
```

위의 구조에서 c를 클릭했을 경우, 이벤트가 a -> b -> c 로 전파되는 현상을 의미한다.
다음과 같이 event 를 등록 할 떄, capture option을 활성화하여 사용한다.
```javascript
el.addEventListener('click', event , {capture: true})

// or 

el.addEventListener('click', event , true)
```



## 3. stopPropagation
> propagation의 뜻은 **번식** 이다.
부모 element로의 캡쳐링/버블링을 막기위해선, stopPropagation 을 사용한다.
```html
<div id="a">
    <div id="b">
        <div id="c" onclick="(e)=>e.stopPropagation()">
        </div>
    </div>
</div>
```

을 실행하게 되면, 이벤트는 c에서만 실행되게 된다.


## 4. stopImmediatePropagation
같은 레벨에 여러가지 이벤트 리스너가 등록되어 있을 경우에, stopPropagation을 사용하면
동일레벨에서의 메서드 실행을 제어하지 못한다.

```html
<div id="a">
    <div id="b">
        <div id="c" onclick="A함수;B함수">
        </div>
    </div>
</div>
```
위의 케이스에서 A함수의 실행만 시키고 싶어 stopPropagation을 함수내부에서 호출하여도, 같은레벨의 B함수는 계속 실행된다.
이유는 stopPropagation은 상위레벨로의 이벤트 전파만 방지하기 때문이다.

위의 케이스에서는 stopImmediatePropatation을 사용하여, 같은레벨로 이벤트가 전파되는 것을 방지해준다.

## 5. Bubbling 되지않는 메서드
* focus 

## 6. event.target vs event.currentTarget vs event.eventPhase
* **event.target :** 실제 이벤트가 발생한 타겟.
* **event.currentTarget :** 현재 이벤트가 벌어지고 있는 모타겟.
* **event.eventPhase :**  현재 이벤트 흐름 단계(캡처링=1, 타깃=2, 버블링=3)

## 7. 버블링을 굳이 막을 필요는 없다.
지금은 상위 요소에서 이벤트가 어떻게 쓰일지 확실치 않더라도, 추후에 버블링이 필요한 경우가 생기기 때문에 stopPropagation의 사용은 추천하지 않는다.

## 8. Bubbling이 Default value가 된 배경.
> 현실에서 사고가 발생하면 지역 경찰이 먼저 사고를 조사합니다. 그 지역에 대해 가장 잘 아는 기관은 지역 경찰이기 때문입니다. 추가 조사가 필요하다면 그 이후에 상위 기관이 사건을 넘겨받습니다.

## 9. 이벤트 위임(event delegation)
> 캡쳐링과 버블링을 이용한 이벤트 핸들링 패턴

### 참고문헌
* https://ko.javascript.info/bubbling-and-capturing
* https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/
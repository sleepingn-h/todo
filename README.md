# 0. 프로젝트의 주요 기능과 사용된 기술 스택 설명:

이 프로젝트는 단순한 Todo를 넘어 **실무 서비스 구조**를 모사한 프론트엔드 앱입니다.  
React + TypeScript 기반으로 **데이터 흐름(캐싱/동기화), 의존성 주입(DI), 접근성(ARIA), 재사용 가능한 컴포넌트(Compound Pattern)**를 구현했습니다.

> **목표**: 단순 CRUD를 넘어서 **테스트 가능성, 확장성, 사용자 경험**을 모두 갖춘 실무형 예시 제공

## 0-1. 사용된 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=for-the-badge) ![React Query](https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=fff&style=for-the-badge) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=fff&style=for-the-badge) ![Zod](https://img.shields.io/badge/Zod-3E63DD?style=for-the-badge)

## 0-2. 하이라이트 코드

### 데이터 흐름 & 동기화

**React Query로 캐싱·동기화**, **DI 기반 Mock API ↔ 실제 API 전환이 가능한 유연한 구조**로 실무 수준의 데이터 흐름을 구축했습니다.

1. **React Query 캐싱 전략**

   - `['todos']` (목록), `['todo', id]` (상세)처럼 **쿼리 키를 분리**하여 관리합니다.  
     → Todo 생성, 수정, 삭제 시 **목록만 부분 업데이트**하거나 특정 상세 데이터만 갱신할 수 있습니다.
   - `staleTime`을 설정해 짧은 시간 내 같은 요청은 캐시를 우선 사용하도록 하여 **네트워크 부하를 줄이고 빠른 UI 응답성**을 확보했습니다.
   - `onSuccess`에서 `setQueryData`와 `invalidateQueries`를 적절히 조합해,
     - **즉시 UI 반영**
     - **최종 정합성 보장**  
       두 가지를 동시에 달성했습니다.

2. **의존성 주입(DI) 기반 전환**
   - `TodoService`는 `IHttpClient` 인터페이스를 주입받아 동작합니다.
     - `HttpClient` → 실제 서버와 통신
     - `FakeHttp` → localStorage 기반 Mock
   - 이를 통해 **테스트·스토리북·시연 환경에서는 Mock**, **운영 환경에서는 Real API**로 간단히 교체 가능합니다.

### UI/UX & 접근성

사용자 경험과 접근성을 동시에 고려하여, 단순 UI 컴포넌트가 아닌 **재사용 가능하고 접근성을 준수하는 컴포넌트**를 직접 구현했습니다.

1. **Compound Component 패턴 적용**

   - `RadioGroup` / `RadioGroup.Radio` 같은 구조를 사용하여, 상위 컴포넌트에서 상태를 관리하고 하위 컴포넌트는 컨텍스트를 통해 필요한 값만 참조합니다.
   - 이를 통해 **사용자는 직관적인 API** (`<RadioGroup value=...><Radio value=... /></RadioGroup>`)로 컴포넌트를 사용할 수 있고, 내부적으로는 **유연한 확장성**을 가질 수 있습니다.

2. **웹 접근성 ARIA 속성 활용**

   - 라디오 그룹에는 `role="radiogroup"`, 각 라디오 버튼에는 `role="radio"`와 `aria-checked`를 부여하여 **스크린리더가 현재 상태를 정확히 읽을 수 있도록** 했습니다.
   - 토글 버튼류에는 `aria-pressed`, 드롭다운에는 `aria-expanded`와 `aria-controls`를 적용해 **열림/닫힘 상태를 보조기기에 전달**합니다.
   - 키보드 사용자를 위해 **Roving Tabindex 패턴**을 적용하여 화살표로 이동, Space/Enter로 선택이 가능하도록 했습니다.

3. **Dropdown, Checkbox 등에도 일관된 접근성 적용**
   - Dropdown 메뉴 항목은 `role="menuitem"`, Checkbox는 `role="checkbox" + aria-checked`로 접근성 상태를 표현합니다.
   - 이렇게 구현된 컴포넌트는 마우스 없이도 전부 조작 가능하며, **실제 서비스 환경에서도 접근성 기준을 충족**합니다.

# 1. 클라이언트 구현 안내

## Assignment 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [ ] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [ ] 이메일 조건 : 최소 `@`, `.` 포함
  - [ ] 비밀번호 조건 : 8자 이상 입력
  - [ ] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [ ] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [ ] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [ ] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

## Assignment 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [ ] 목록 / 상세 영역으로 나누어 구현해주세요
  - [ ] Todo 목록을 볼 수 있습니다.
  - [ ] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [ ] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [ ] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [ ] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [ ] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

  - [ ] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

# 2. API 스펙

## [Todos](#todos)

- [getTodos](#getTodos)
- [getTodoById](#getTodoById)
- [createTodo](#createTodo)
- [updateTodo](#updateTodo)
- [deleteTodo](#deleteTodo)

## [Auth](#auth)

- [login](#login)
- [signUp](#signUp)

# <span id="todos">1) Todos</span>

## <span id="getTodos">1-2) getTodos</span>

### URL

- GET `/todos`
- Headers
  - Authorization: login token

### Query Parameters

- **sort** (string, optional): 정렬 기준 (`createdAt`, `updatedAt`, `priority`)
- **order** (string, optional): 정렬 순서 (`asc` 또는 `desc`)
- **priority** (string, optional): 우선순위 필터링 (`urgent`, `normal`, `low`)
- **keyword** (string, optional): 제목 또는 내용에서 검색할 키워드
- **countOnly** (boolean, optional): `true`로 설정하면 할 일의 개수만 반환

### 응답 예시

```json
{
  "data": [
    {
      "title": "hi",
      "content": "hello",
      "id": "z3FGrcRL55qDCFnP4KRtn",
      "createdAt": "2022-07-24T14:15:55.537Z",
      "updatedAt": "2022-07-24T14:15:55.537Z",
      "priority": "urgent"
    },
    {
      "title": "hi",
      "content": "hello",
      "id": "z3FGrcRL55qDCFnP4KRtn",
      "createdAt": "2022-07-24T14:15:55.537Z",
      "updatedAt": "2022-07-24T14:15:55.537Z",
      "priority": "normal"
    }
  ]
}
```

예시 사용법:

- **우선순위 필터링**: `/todos?priority=urgent`
- **정렬 및 순서 지정**: `/todos?sort=createdAt&order=desc`
- **조합된 조건**: `/todos?priority=normal&sort=updatedAt&order=asc&keyword=project`

---

## <span id="todos">1-2) getTodoById</span>

### URL

- GET `/todos/:id`
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": {
    "title": "hi",
    "content": "hello",
    "id": "z3FGrcRL55qDCFnP4KRtn",
    "createdAt": "2022-07-24T14:15:55.537Z",
    "updatedAt": "2022-07-24T14:15:55.537Z",
    "priority": "urgent"
  }
}
```

---

## <span id="createTodo">1-3) createTodo</span>

### URL

- POST `/todos`
- Parameters
  - title: string
  - content: string
  - priority: "urgent" | "normal" | "low"
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": {
    "title": "hi",
    "content": "hello",
    "id": "z3FGrcRL55qDCFnP4KRtn",
    "createdAt": "2022-07-24T14:15:55.537Z",
    "updatedAt": "2022-07-24T14:15:55.537Z",
    "priority": "normal"
  }
}
```

---

## <span id="updateTodo">1-4) updateTodo</span>

### URL

- PUT `/todos/:id`
- Parameters
  - title: string
  - content: string
  - priority: "urgent" | "normal" | "low"
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": {
    "title": "제목 변경",
    "content": "내용 변경",
    "id": "RMfi3XyOKoI5zd0A_bsPL",
    "createdAt": "2022-07-24T14:25:48.627Z",
    "updatedAt": "2022-07-24T14:25:48.627Z",
    "priority": "urgent"
  }
}
```

---

## <span id="deleteTodo">1-5) deleteTodo</span>

### URL

- DELETE `/todos/:id`
- Headers
  - Authorization: login token

### 응답 예시

```json
{
  "data": null
}
```

---

# <span id="auth">2) Auth</span>

## <span id="login">2-1) login</span>

### URL

- POST `/users/login`
- Parameters
  - email: string
  - password: string

### 응답 예시

```json
{
  "message": "성공적으로 로그인 했습니다",
  "token": "eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk"
}
```

---

## signUp

## <span id="signUp">2-2) signUp</span>

### URL

- POST `/users/create`
- Parameters
  - email: string
  - password: string

### 응답 예시

```json
{
  "message": "계정이 성공적으로 생성되었습니다",
  "token": "eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk"
}
```

```

```

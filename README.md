# 🧩 **B2B 통계 대시보드 생성기**
**기업 통계 분석을 위한 React 프론트엔드 애플리케이션**  

TypeScript, TanStack Query, Zustand를 활용한 웹 애플리케이션입니다.

---

## 👥 **프로젝트 정보**
- **프로젝트명**: B2B 통계 대시보드 생성기
- **설명**:  
  - 기업별 로그인 및 프로젝트 테이블 선택  
  - 사용자 정의 그룹 항목 및 집계 항목 커스터마이징  
  - 조건 기반 통계 쿼리 자동 생성  
  - JSON 데이터 출력 → ApexCharts 등 시각화 연동  
- **진행 기간**: 2025.06 ~ 진행 중  
- **개발 인원**: 2명
- **URL**: https://rag-dashboard-console.vercel.app/
- **Repository**
  - **BackEnd:** https://github.com/qldmq/dashboardTemplate
  - **FrontEnd:** https://github.com/ParkYongHo1/Rag-Dashboard-Console

### 🔧 **팀원**
|     | 이름               | 역할           | GitHub                                      |
|-----|--------------------|----------------|---------------------------------------------|
|<img src="https://github.com/ParkYongHo1.png" width="80"/> | **박용호** | 프론트엔드 개발 | [용호 GitHub](https://github.com/ParkYongHo1) |
|<img src="https://github.com/qldmq.png" width="80"/>| **김서현** | 백엔드 개발     | [서현 GitHub](https://github.com/qldmq)     |

---

## ✨ **핵심 기능**

### 🔐 **인증 시스템**
- **JWT 토큰 자동 갱신**: Access Token 만료 시 자동 갱신
- **Axios 인터셉터**: 401 에러 시 토큰 재발급 및 요청 재시도
- **동시성 제어**: 여러 API 호출 시 토큰 갱신 중복 방지
- **사전 갱신 시스템**: 토큰 만료 전 미리 갱신하여 끊김 없는 UX 제공

### 🛡️ **에러 처리**
- **Error Boundary**: React 컴포넌트 에러 캐치 및 복구
- **전역 에러 처리**: API 에러에 대한 일관된 사용자 피드백
- 
### 📊 **동적 대시보드 생성**
- **테이블 선택**: 기업별 데이터베이스 테이블 동적 로드
- **그룹 항목**: 통계 분석을 위한 차원 설정 (예: 제품별, 지역별)
- **집계 항목**: 통계 조건 설정 (예: 연령대, 성별, 거주지)
- **실시간 프리뷰**: 설정 변경 시 즉시 차트 업데이트

### 📈 **시각화 & 차트**
- **ApexCharts 통합**: 다양한 차트 타입 지원
- **JSON 기반 설정**: 유연한 차트 구성 관리

---

## 🛠️ **기술 스택**

| 구분              | 기술                                    |
|-------------------|----------------------------------------|
| **Language**      | TypeScript                             |
| **Framework**     | React.js                               |
| **State Management** | Zustand                             |
| **Data Fetching** | TanStack Query (React Query)          |
| **HTTP Client**   | Axios                                  |
| **Styling**       | Tailwind CSS                           |
| **Charts**        | ApexCharts                             |
| **Routing**       | React Router                           |
| **Build Tool**    | Vite                                   |
| **Deploy**        | Vercel                                 |

---

## 🎯 **주요 성과**

### 💡 **기술적 성과**
- ✅ **무중단 인증**: 토큰 갱신 시 사용자 경험 중단 없음
- ✅ **타입 안정성**: TypeScript로 런타임 에러 감소
- ✅ **성능 최적화**: TanStack Query 캐싱으로 API 호출 절약
- ✅ **상태 관리**: Zustand로 보일러플레이트 코드 감소

### 🚀 **사용자 경험**
- ✅ **직관적 UI**: 드래그 앤 드롭 방식의 대시보드 생성
- ✅ **실시간 피드백**: 설정 변경 시 즉시 차트 업데이트
- ✅ **에러 복구**: 네트워크 오류 시 자동 재시도

---

## 📱 **주요 화면**

### 🔐 **로그인 페이지**
- JWT 토큰 기반 인증
- 기업별 로그인 지원
- 자동 로그인 유지

### 📊 **대시보드 생성 페이지**
- 테이블 선택 인터페이스
- 그룹/집계 항목 설정
- 실시간 프리뷰

### 📈 **통계 분석 페이지**
- 다양한 차트 타입
- 필터링 및 정렬
- 데이터 내보내기

---

## 🎯 **기대 효과**

### 📊 **비즈니스 가치**
- ✅ 실무 기반 데이터 분석 UX 시뮬레이션
- ✅ 기업별 맞춤형 통계 분석 도구
- ✅ 직관적인 대시보드 생성 경험

---

## 🔗 **관련 링크**

- **🌐 Live Demo**: https://rag-dashboard-console.vercel.app/
- **📚 API 문서**: https://dashboardtemplate.duckdns.org/swagger-ui/index.html
- **💻 Frontend Repository**: https://github.com/ParkYongHo1/Rag-Dashboard-Console
- **⚙️ Backend Repository**: https://github.com/qldmq/dashboardTemplate




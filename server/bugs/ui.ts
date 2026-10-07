import type { Bug } from "./types";

/**
 * UI 버그. ID 접두사는 U 다.
 *
 * 이 파일은 UI 버그 담당자만 건드린다. 다른 분야의 레지스트리를
 * 열지 않으면 브랜치를 합칠 때 충돌이 나지 않는다.
 *
 * 형식은 types.ts 의 Bug 를 따른다. 빠진 항목이 있으면 빌드가 멈춘다.
 */
export const uiBugs: Bug[] = [];

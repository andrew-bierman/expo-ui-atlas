import content from './content.json';

export enum LegalDocumentId {
  Privacy = 'privacy',
  Support = 'support',
  Notices = 'notices',
}
interface LegalDocument {
  title: string;
  sourceUrl: string;
  markdown: string;
}
export const legalDocuments = content.documents satisfies Record<
  LegalDocumentId,
  LegalDocument
>;
export const dependencyNotices = content.dependencyNotices;
export function isLegalDocumentId(value: unknown): value is LegalDocumentId {
  return typeof value === 'string' && Object.hasOwn(legalDocuments, value);
}

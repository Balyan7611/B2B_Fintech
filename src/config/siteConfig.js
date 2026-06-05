// src/config/siteConfig.js

// ─── Image URL Base ───────────────────────────────────────────────────────────
const API_BASE = 'https://api.sahayatamoney.in';

/**
 * Build full image URL from filename returned by API.
 * API returns just the filename e.g. "logo.png" or "/logo.png"
 * Actual URL = https://api.sahayatamoney.in/UploadedFiles/{folder}/{filename}
 */
export const getImageUrl = (filename, folder) => {
  if (!filename) return null;
  // Already a full URL — return as-is
  if (filename.startsWith('http://') || filename.startsWith('https://')) return filename;
  // Strip any leading slashes
  const clean = filename.replace(/^\/+/, '');
  if (!clean) return null;
  return `${API_BASE}/UploadedFiles/${folder}/${clean}`;
};

// Convenience helpers
export const getLogoUrl      = (f) => getImageUrl(f, 'logo');
export const getSignatureUrl = (f) => getImageUrl(f, 'signature');
export const getFaviconUrl   = (f) => getImageUrl(f, 'favicon');

// ─── Site Config Object ───────────────────────────────────────────────────────
export const SITE_CONFIG = {
  companyName: 'Loading...',
  brandName:   'Loading...',
  shortName:   'Loading...',
  ownerName:   'Loading...',
  phone:       'Loading...',
  email:       'Loading...',
  address:     'Loading...',
  description: 'Loading...',
  logo:        null,   // ← Full URL will be stored here
  signature:   null,   // ← Full URL
  feviconIcon: null,   // ← Full URL
  alternateEmail:  null,
  alternateMobile: null,
  bankName:    null,
  acName:      null,
  acNumber:    null,
  acType:      null,
  ifsc:        null,
  micrCode:    null,
  websiteUrl:  null,
  androidUrl:  null,
  headerColor: null,
  leftColor:   null,
  bodyColor:   null,
  copyright:   null,
  faceBook:    null,
  instagram:   null,
  twiter:      null,
  youtube:     null,
  whastApp:    null,
  profileAmount: 0,
  isActive:    true,
  createdDate: null,
  memberId:    null,
  memberName:  null,
};

// ─── Update from API response ─────────────────────────────────────────────────
export const updateSiteConfig = (apiData) => {
  if (!apiData) return;

  const map = {
    name:           'companyName',
    ownerName:      'ownerName',
    email:          'email',
    mobile:         'phone',
    alternateEmail: 'alternateEmail',
    alternateMobile:'alternateMobile',
    address:        'address',
    bankName:       'bankName',
    acname:         'acName',
    acnumber:       'acNumber',
    actype:         'acType',
    ifsc:           'ifsc',
    micrcode:       'micrCode',
    headerColor:    'headerColor',
    leftColor:      'leftColor',
    bodyColor:      'bodyColor',
    copyright:      'copyright',
    websiteUrl:     'websiteUrl',
    androidUrl:     'androidUrl',
    faceBook:       'faceBook',
    instagram:      'instagram',
    twiter:         'twiter',
    youtube:        'youtube',
    whastApp:       'whastApp',
    profileAmount:  'profileAmount',
    isActive:       'isActive',
    createdDate:    'createdDate',
    memberId:       'memberId',
    memberName:     'memberName',
  };

  // Map all regular text fields
  Object.keys(apiData).forEach(key => {
    if (map[key] !== undefined) {
      const val = apiData[key];
      if (val !== null && val !== undefined && val !== '') {
        SITE_CONFIG[map[key]] = val;
      }
    }
  });

  // ── Image fields: build full URL with correct folder ──
  // API returns e.g. "logo.png" → we store full URL
  if (apiData.logo)       SITE_CONFIG.logo       = getLogoUrl(apiData.logo);
  if (apiData.signature)  SITE_CONFIG.signature  = getSignatureUrl(apiData.signature);
  if (apiData.feviconicon)SITE_CONFIG.feviconIcon = getFaviconUrl(apiData.feviconicon);

  // ── Name-derived fields ──
  if (apiData.name) {
    SITE_CONFIG.companyName = apiData.name;
    SITE_CONFIG.brandName   = apiData.name;
    SITE_CONFIG.shortName   = apiData.name;
  }

  // ── Description ──
  if (apiData.copyright) {
    SITE_CONFIG.description = apiData.copyright;
  } else if (apiData.name) {
    SITE_CONFIG.description = `${apiData.name} — Digital Fintech Platform`;
  }
};
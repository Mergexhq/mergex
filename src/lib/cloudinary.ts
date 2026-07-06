/**
 * Cloudinary Asset Utility
 * 
 * Cloud name: mergex
 * Public IDs mirror the local /public folder paths.
 * 
 * Example:
 *   Local:      /public/team/Manikandan.jpeg
 *   Cloudinary: https://res.cloudinary.com/mergex/image/upload/team/Manikandan
 */

const CLOUD_NAME = 'mergex';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

/**
 * Returns a Cloudinary image URL with optional transformation parameters.
 * @param publicId - The Cloudinary public ID (mirrors local /public path without leading slash or extension)
 * @param transforms - Optional transformation string (e.g. 'f_auto,q_auto,w_1920')
 */
export function cloudinaryImage(publicId: string, transforms = 'f_auto,q_auto'): string {
    return `${BASE_URL}/image/upload/${transforms}/${publicId}`;
}

/**
 * Returns a Cloudinary video URL with optional transformation parameters.
 * @param publicId - The Cloudinary public ID
 * @param transforms - Optional transformation string
 */
export function cloudinaryVideo(publicId: string, transforms = 'f_auto,q_auto'): string {
    return `${BASE_URL}/video/upload/${transforms}/${publicId}.mp4`;
}

/**
 * Returns a Cloudinary raw file URL (for files that don't fit image/video).
 * @param publicId - The Cloudinary public ID
 */
export function cloudinaryRaw(publicId: string): string {
    return `${BASE_URL}/raw/upload/${publicId}`;
}

// ─── Pre-built Asset Constants ─────────────────────────────────────────────

/** Footer backgrounds */
export const CLOUDINARY_ASSETS = {
    // Footer
    footerDesktop: cloudinaryImage('footer_wqtnvo', 'f_auto,q_auto,w_2560'),
    footerMobile: cloudinaryImage('footer_mobile_sdpjfc', 'f_auto,q_auto,w_1080'),

    // Labs
    labsCta: cloudinaryImage('background/labs/Cta', 'f_auto,q_auto,w_2560'),
    /** Returns the Cloudinary URL for a labs hero frame (1-240) */
    labsFrame: (frameNum: string) =>
        cloudinaryImage(`background/labs/frames_webp/frame_${frameNum}`, 'f_auto,q_auto'),

    // Parent
    parentHeroDesktop: cloudinaryImage('background/parent/hero/parent-hero', 'f_auto,q_auto,w_2560'),
    parentHeroMobile: cloudinaryImage('background/parent/hero/parent_hero_mobile', 'f_auto,q_auto,w_1080'),

    // Systems
    systemsHero: cloudinaryImage('system_hero_osseww', 'f_auto,q_auto,w_2560'),

    // Careers
    careerHero: cloudinaryImage('career_hero_c5q4l3', 'f_auto,q_auto,w_2560'),
    careerFooter: cloudinaryImage('footer_ho3q8c', 'f_auto,q_auto,w_2560'),

    // Ecosystem (divition) videos
    ecosystemLabsVideo: cloudinaryVideo('background/parent/divition/Flamingo_Labs', 'f_auto,q_auto'),
    ecosystemSystemsVideo: cloudinaryVideo('background/parent/divition/Human_and_Robot_Handshake', 'f_auto,q_auto'),

    // Fragmentation cards
    fragmentationCard1: cloudinaryImage('mockups/parent/fragmentation/Inteligence', 'f_auto,q_auto,w_800'),
    fragmentationCard2: cloudinaryImage('mockups/parent/fragmentation/Disconnected_tools', 'f_auto,q_auto,w_1200'),
    fragmentationCard4: cloudinaryImage('mockups/parent/fragmentation/ai_hype', 'f_auto,q_auto,w_800'),

    // Common mockups
    cedarwbg: cloudinaryImage('mockups/common/cedarwbg', 'f_auto,q_auto,w_800'),
    adVideo: cloudinaryVideo('mockups/labs/Portfolio/ad', 'f_auto,q_auto'),

    // Showreel
    showreelVideo: cloudinaryVideo('mockups/parent/showreel/Showreel', 'f_auto,q_auto'),

    // Model
    saraVega: cloudinaryImage('model/Sara_Vega', 'f_auto,q_auto,w_2560'),

    // Team members
    teamManikandan: cloudinaryImage('Team/hf_20260311_040000_0e37920f_rxgdf2', 'f_auto,q_auto,w_600'),
    teamSharukesh: cloudinaryImage('Team/hf_20260311_035307_e0c67548_qac2tc', 'f_auto,q_auto,w_600'),
    teamJohn: cloudinaryImage('Team/hf_20260311_035824_cc0551a4_gr1vjv', 'f_auto,q_auto,w_600'),
    teamMuralidharan: cloudinaryImage('Team/hf_20260311_035307_e0c67548_qac2tc', 'f_auto,q_auto,w_600'), // Fallback to available team image if exact match is missing
    teamYasshwanth: cloudinaryImage('Team/hf_20260311_040000_0e37920f_rxgdf2', 'f_auto,q_auto,w_600'), // Fallback to available team image if exact match is missing
} as const;

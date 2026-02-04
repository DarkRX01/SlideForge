export interface Presentation {
  id: string;
  title: string;
  slides: Slide[];
  theme: Theme;
  createdAt: string;
  updatedAt: string;
}

export interface Slide {
  id: string;
  presentationId: string;
  order: number;
  background: Background;
  elements: SlideElement[];
  animations: Animation[];
  notes?: string;
}

export interface SlideElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'video';
  position: Position;
  size: Size;
  rotation: number;
  zIndex: number;
  properties: TextProperties | ImageProperties | ShapeProperties | VideoProperties;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface TextProperties {
  content: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  color: string;
  align: 'left' | 'center' | 'right' | 'justify';
  lineHeight: number;
}

export interface ImageProperties {
  url: string;
  alt?: string;
  fit: 'cover' | 'contain' | 'fill';
  filters?: ImageFilters;
}

export interface ImageFilters {
  brightness?: number;
  contrast?: number;
  saturation?: number;
  blur?: number;
}

export interface ShapeProperties {
  type: 'rectangle' | 'circle' | 'triangle' | 'line';
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface VideoProperties {
  url: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
}

export interface Background {
  type: 'color' | 'gradient' | 'image';
  value: string;
}

export interface Animation {
  id: string;
  elementId: string;
  type: 'fade' | 'slide' | 'zoom' | 'rotate' | 'morph' | '3d' | 'particle';
  duration: number;
  delay: number;
  easing: string;
  keyframes?: Keyframe[];
}

export interface Keyframe {
  time: number;
  properties: Record<string, any>;
}

export interface Theme {
  name: string;
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Voice-related types
export interface VoiceCommandRequest {
  audio: Blob | Buffer;
  language?: string;
}

export interface VoiceCommandResponse {
  transcript: string;
  action: VoiceCommandAction;
  confidence: number;
}

export interface VoiceCommandAction {
  type: string;
  params?: Record<string, any>;
}

export interface TTSRequest {
  text: string;
  language?: string;
  voice?: string;
  speed?: number;
}

export interface TTSResponse {
  audioUrl: string;
  duration: number;
}

export interface VoiceOverRequest {
  slideId: string;
  text: string;
  voice?: string;
}

export interface VoiceOverResponse {
  audioUrl: string;
  duration: number;
}

export interface AvailableVoice {
  id: string;
  name: string;
  language: string;
  gender?: 'male' | 'female';
}

export interface VoiceSettings {
  enabled: boolean;
  language: string;
  voice: string;
  speed: number;
}

export interface SlideVoiceOver {
  slideId: string;
  audioUrl: string;
  duration: number;
}

// Cache types
export interface CacheEntry {
  key: string;
  value: any;
  expiresAt: number;
}

// Export types
export interface ExportConfig {
  format: 'pdf' | 'pptx' | 'html' | 'video';
  quality: 'low' | 'medium' | 'high';
  includeAnimations?: boolean;
}

export interface ExportJob {
  id: string;
  presentationId: string;
  format: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  outputPath?: string;
  error?: string;
}

// Animation types
export interface AnimationTimeline {
  id: string;
  slideId: string;
  animations: Animation[];
}

export interface AnimationPreset {
  id: string;
  name: string;
  type: string;
  preview: string;
  config: Partial<Animation>;
}

export type EasingType = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'power2.in' | 'power2.out' | 'power2.inOut';

export type AnimationType = 'fade' | 'slide' | 'zoom' | 'rotate' | 'morph' | '3d' | 'particle' | 'custom';

export interface ParticleConfig {
  count: number;
  size: number;
  color: string;
  speed: number;
}

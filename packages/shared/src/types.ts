export interface Presentation {
  id: string;
  title: string;
  description?: string;
  slides: Slide[];
  theme: Theme;
  settings?: Record<string, any>;
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
  content?: any;
  style?: Record<string, any>;
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
  value?: string;
  color?: string;
  image?: string;
}

export interface Animation {
  id: string;
  elementId: string;
  slideId?: string;
  type: 'fade' | 'slide' | 'zoom' | 'rotate' | 'morph' | '3d' | 'particle';
  duration: number;
  delay: number;
  easing: string;
  keyframes?: Keyframe[];
  properties?: Record<string, any>;
  chain?: string;
  trigger?: string;
  repeat?: number | boolean;
}

export interface Keyframe {
  time: number;
  properties: Record<string, any>;
  easing?: string;
}

export interface Theme {
  name: string;
  mode?: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent?: string;
  };
  fonts?: {
    heading: string;
    body: string;
    code?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Voice-related types
export interface VoiceCommandRequest {
  audio?: Blob | Buffer;
  audioData?: string | Blob;
  language?: string;
  model?: string;
}

export interface VoiceCommandResponse {
  transcript: string;
  action: VoiceCommandAction;
  confidence: number;
  language?: string;
  duration?: number;
}

export interface VoiceCommandAction {
  type: string;
  params?: Record<string, any>;
  target?: string;
  value?: any;
}

export interface TTSRequest {
  text: string;
  language?: string;
  voice?: string;
  speed?: number;
  pitch?: number;
}

export interface TTSResponse {
  audioUrl?: string;
  audioData?: string;
  duration: number;
  format?: 'wav' | 'mp3';
}

export interface VoiceOverRequest {
  slideId: string;
  text: string;
  voice?: string;
  language?: string;
}

export interface VoiceOverResponse {
  audioUrl: string;
  duration: number;
  slideId?: string;
  audioData?: string;
}

export interface AvailableVoice {
  id: string;
  name: string;
  language: string;
  languageCode?: string;
  gender?: 'male' | 'female' | 'neutral';
}

export interface VoiceSettings {
  enabled: boolean;
  language: string;
  voice: string;
  speed: number;
  pitch?: number;
}

export interface SlideVoiceOver {
  id?: string;
  slideId: string;
  audioUrl?: string;
  audioPath?: string;
  duration: number;
  language?: string;
  createdAt?: string;
}

// Cache types
export interface CacheEntry {
  key: string;
  value: any;
  expiresAt: number;
  type?: string;
}

// Export types
export interface ExportConfig {
  format: 'pdf' | 'pptx' | 'html' | 'video';
  quality: 'low' | 'medium' | 'high';
  includeAnimations?: boolean;
  options?: Record<string, any>;
}

export interface ExportJob {
  id: string;
  presentationId: string;
  format: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  outputPath?: string;
  filePath?: string;
  error?: string;
  createdAt?: string;
  completedAt?: string;
}

// Animation types
export interface AnimationTimeline {
  id: string;
  slideId: string;
  animations: Animation[];
  duration?: number;
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

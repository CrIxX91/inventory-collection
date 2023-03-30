import io from 'socket.io-client';
import { base } from '@/api/AuthApi';

export const socket = io(base);
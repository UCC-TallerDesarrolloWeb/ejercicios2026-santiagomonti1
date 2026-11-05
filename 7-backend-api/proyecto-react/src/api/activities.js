import { request } from './config.js'

// GET /activities
export const getActivities = () => request('activities')

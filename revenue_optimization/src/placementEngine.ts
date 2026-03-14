export interface Ad {
    adId: string;
    advertiserId: string;
    timeReceived: number;
    timeout: number;
    duration: number;
    baseRevenue: number;
    bannedLocations: string[];
}

export interface Area {
    areaId: string;
    location: string;
    multiplier: number;
    totalScreens: number;
    timeWindow: number;
}

export interface ScheduledAd {
    adId: string;
    areaId: string;
    startTime: number;
    endTime: number;
}

export type Schedule = Record<string, ScheduledAd[]>;

export class PlacementEngine {

    constructor() {
    }

    isAdCompatibleWithArea(ad: Ad, area: Area): boolean {
        for(let i = 0 ; i <= ad.bannedLocations.length ; i++) {
            if(ad.bannedLocations[i] === area.location) {
                return false;
            }
        }
        return true;
    }

    getTotalScheduledTimeForArea(areaSchedule: ScheduledAd[]): number {
        let totalScheduledTime = 0;

        for(let i = 0 ; i < areaSchedule.length ; i++) {
            totalScheduledTime += areaSchedule[i].endTime - areaSchedule[i].startTime;
        }

        return totalScheduledTime;
    }

    doesPlacementFitTimingConstraints(
        ad: Ad,
        area: Area,
        startTime: number
    ): boolean {

        if( (ad.timeReceived <= startTime) && 
            (startTime <= ad.timeReceived + ad.timeout) && 
            (area.timeWindow > startTime + ad.duration)) {

            return true;
        }
        return false;
    }

    isAdAlreadyScheduled(adId: string, schedule: Schedule): boolean {
        return false;
    }

    canScheduleAd(
        ad: Ad,
        area: Area,
        schedule: Schedule,
        startTime: number
    ): boolean {
        return false;
    }

    isAreaScheduleValid(area: Area, areaSchedule: ScheduledAd[], ads: Ad[]): boolean {
        return false;
    }
}
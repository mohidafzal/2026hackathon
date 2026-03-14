/**
 * CHALLENGE 1: Single Technician — Shortest Route
 *
 * A technician starts at a known GPS location and must visit every broken
 * box exactly once. Your goal is to find the shortest possible total travel
 * distance.
 *
 * Scoring:
 *   - Correctness  — every box visited exactly once, distance is accurate.
 *   - Route quality — your total distance is compared against other teams;
 *                     shorter routes score higher on the load tests.
 *
 * Do NOT modify any interface or the pre-implemented helper methods.
 * Implement every method marked with TODO.
 */

export interface Location {
    latitude: number;   // decimal degrees
    longitude: number;  // decimal degrees
}

export interface Box {
    id: string;
    name: string;
    location: Location;
}

export interface Technician {
    id: string;
    name: string;
    startLocation: Location;
}

export interface RouteResult {
    technicianId: string;
    /** Ordered list of box IDs. Every box must appear exactly once. */
    route: string[];
    /** Total travel distance in km. Does NOT include a return leg to start. */
    totalDistanceKm: number;
}

export class RouteOptimizer {

    // ── Pre-implemented helper — do not modify ────────────────────────────────

    /**
     * Returns the great-circle distance in kilometres between two GPS
     * coordinates using the Haversine formula (Earth radius = 6 371 km).
     */
    haversineDistance(loc1: Location, loc2: Location): number {
        const R = 6371;
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const dLat = toRad(loc2.latitude - loc1.latitude);
        const dLng = toRad(loc2.longitude - loc1.longitude);
        const lat1 = toRad(loc1.latitude);
        const lat2 = toRad(loc2.latitude);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    // ── Your implementation below ─────────────────────────────────────────────

    calculateRouteDistance(
        technician: Technician,
        boxes: Box[],
        routeIds: string[]
    ): number | null {
        let totalDist: number = 0;
        if (boxes.length == 0 || routeIds.length == 0) {
            return totalDist;
        }
        let currLoc: Location = technician.startLocation;
        let checkedlocation: String[] = [];
        routeIds.length
        for (let i: number = 0; i < routeIds.length; i++) {
            if (checkedlocation.indexOf(routeIds[i]) == -1) {
                const box: Box | undefined = boxes.find(b => b.id == routeIds[i]);
                if (box !== undefined) {
                    totalDist = totalDist + this.haversineDistance(currLoc, box.location);
                    currLoc = box.location;
                } else {
                    return null
                }
                checkedlocation.push(routeIds[i])
            }

        }
        return totalDist;
    }

    findShortestRoute(technician: Technician, boxes: Box[]): RouteResult {
        const result: RouteResult = {
            technicianId: technician.id,
            route: [],
            totalDistanceKm: 0
        };
        let lowestDist: number | null = 999999999;
        let bestRoute: string[] = [];
        let currRoute: string[] = [];
        for (let i = 0; i < boxes.length; i++) {
            bestRoute.push(boxes[i].id)
        }
        lowestDist = this.calculateRouteDistance(technician, boxes, bestRoute);
        result.route = bestRoute;
        if (lowestDist !== null)
            result.totalDistanceKm = lowestDist;
        return result
    }
}

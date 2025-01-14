'use server'
import { ILaunch } from '@/models';

export async function getLaunches(limit: number = 50): Promise<ILaunch[]> {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}launches/upcoming/?mode=normal&limit=${limit}`, { next: { revalidate: 257 } })
    const { results } = await data.json()

    return results.map((
        item: {
            status: { abbrev: string };
            rocket: {
                configuration: { name: string }
            };
            mission: { name: string, type: string; orbit: { abbrev: string } };
            net: { net: string };
        }) => (
        {
            status: item.status.abbrev,
            rocket: item.rocket.configuration.name,
            mission_type: item.mission.type,
            orbit: item.mission.orbit.abbrev,
            net: item.net,
            mission_name: item.mission.name
        }))
}
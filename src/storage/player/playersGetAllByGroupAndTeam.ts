import {playersGetAllByGroup} from './playersGetAllByGroup'

export async function playersGetAllByGroupAndTeam(group: string, team: string) {
  try {
    const playersByGroup = await playersGetAllByGroup(group)

    return playersByGroup ? playersByGroup.filter(player => player.team === team) : []
  }catch(error) {
    throw error
  }
}
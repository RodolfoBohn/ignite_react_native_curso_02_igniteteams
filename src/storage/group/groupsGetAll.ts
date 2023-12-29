import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLECTION } from "@storage/storageConfig";

export async function groupsGetAll() {
  try {
    const storageGroups = await AsyncStorage.getItem(GROUP_COLECTION)

    const groups:string[] = storageGroups ? JSON.parse(storageGroups) : []

    return groups
  } catch(error) {
    throw error
  }
}
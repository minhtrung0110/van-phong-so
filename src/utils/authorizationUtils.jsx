import {isEmpty} from "lodash";

export const authorizationFeature = (listPermissions, key, keyFeature) => {
    return !isEmpty(listPermissions) && listPermissions.some((item) => {
        if (item.name === key) {
            return Object.keys(item.permission).some(keyP => {
                    return keyP.includes(keyFeature) && item.permission[keyP] === true
                }
            )
        }
        return false
    })

}
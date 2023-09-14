export const authRoles = {
    sa: ['SA'], // Only Super Admin has access
    bi: ['SA', 'ADMIN', 'EDITOR'], // Only SA & Admin & Editor has access
    etl: ['SA', 'ADMIN'], // Only SA & Admin has access
    qa: ['SA', 'ADMIN', 'EDITOR', 'GUEST'], // Everyone has access
}
// export const authRoles = {
//     sa: ['SA'], // Only Super Admin has access
//     admin: ['SA', 'ADMIN'], // Only SA & Admin has access
//     editor: ['SA', 'ADMIN', 'EDITOR'], // Only SA & Admin & Editor has access
//     guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST'], // Everyone has access
// }

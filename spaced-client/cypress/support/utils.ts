export const testID = (id: string) => {
    return `[data-id=${id}]`
}

export const dataCy = (id: string) => {
    return cy.get(testID(id))
}
const LEOranks = [
    ["Deputy Sheriff", "DS"],
    ["Detective", "B1"],
    ["Sergeant", "SGT"],
    ["Lieutenant", "LT"],
    ["Captain", "CPT"],
    ["Commander", "CMDR"]
]

const LEOunits = [
    "EXTERNAL",
    "Detective Division, Homicide Bureau",
    "Detective Division, Major Crimes Bureau",
    "Detective Division, Major Crimes Bureau (TRAP)",
    "Detective Division, Narcotics Bureau",
    "Detective Division, Operation Safe Streets Bureau",
    "Internal Affairs Bureau",
    "Davis Sheriff's Station",
    "Davis Sheriff's Station, Gang Enforcement Team",
    "Senora Sheriff's Station",
    "Special Enforcement Detail",
    "Canine Services Detail",
    "Administrative Services Division",
]

const CSIRanks = [
    ["Criminalist", true, false],
    ["Digital Technician", false, true],
    ["Senior Criminalist", true, false],
    ["Senior Digital Technician", false, true],
    ["Supervising Criminalist", true, false],
    ["Supervising Digital Technician", false, true],
    ["Director", true, true],

]


function getDate() {
    return new Date().toLocaleDateString('en-US', {
        // weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
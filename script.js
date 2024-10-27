const calculateBtn = document.querySelector('.js-calculate-price');

const config = {
    education: { undergraduate: 1.5, college: 1.2, highSchool: 1.05, middleSchool: 0.9 },
    netWorth: { upperClass: 2, middleClass: 1.5, lowerClass: 1.2 },
    caste: { brahmin: 100, kshatriya: 50, vaishya: 20, shudra: 10, varna: -50 },
    skills: { musician: 10, cook: 20, easygoing: 15, singer: 10 },
    age: { youngAdult: 1.5, midAdult: 1.2, olderAdult: 0.95 },
    reputation: { gossipParents: 0.85, gossipCharacter: 0.9, generalGossip: -20 }
};

calculateBtn.addEventListener('click', () => {
    const basePrice = document.querySelector('.starting-price').value;
    const personName = document.querySelector('.name').value;
    const education = getSelectedValue('#education');
    const netWorth = getSelectedValue('#networth');
    const caste = getSelectedValue('#caste');
    const age = getSelectedValue('input[name="age"]:checked');
    const reputation = getSelectedValues('input[name="reputation"]:checked');
    const skills = getCheckedSkills();

    if (isNaN(basePrice) || !personName) {
        alert('Please enter both name and starting price');
        return;
    }

    const finalAmount = calculatePrice(basePrice, education, netWorth, caste, age, reputation, skills);
    displayResult(personName, finalAmount);
});

function getSelectedValue(selector) {
    const element = document.querySelector(selector);
    if (element) {
        return element.value;
    } else {
        return '';
    }
}

function getSelectedValues(selector) {
    const elements = document.querySelectorAll(selector);
    const values = [];
    elements.forEach(el => values.push(el.value));
    return values;
}

function getCheckedSkills() {
    const skillElements = document.querySelectorAll('.skills input[type="checkbox"]:checked');
    const skills = [];
    skillElements.forEach(skill => skills.push(skill.id));
    return skills;
}

function calculatePrice(basePrice, education, netWorth, caste, age, reputation, skills) {
    let multiplier = 1;
    let bonus = 0;

    if (config.education[education]) multiplier *= config.education[education];
    if (config.netWorth[netWorth]) multiplier *= config.netWorth[netWorth];
    if (config.age[age]) multiplier *= config.age[age];

    reputation.forEach(rep => {
        if (config.reputation[rep] !== undefined) {
            if (rep === 'generalGossip') {
                bonus += config.reputation[rep];
            } else {
                multiplier *= config.reputation[rep];
            }
        }
    });

    skills.forEach(skill => {
        if (config.skills[skill]) bonus += config.skills[skill];
    });

    if (config.caste[caste]) bonus += config.caste[caste];

    return (basePrice * multiplier) + bonus;
}

function displayResult(name, finalAmount) {
    const output = document.querySelector('.output');
    output.innerHTML = `
        <div>Total Price for ${name}: $${finalAmount.toFixed(2)}</div>
        <div>Love Letter for ${name}: ${document.querySelector('.love-letter').value}</div>
    `;
    output.style.display = 'block';
}

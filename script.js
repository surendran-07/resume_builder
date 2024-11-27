const form = document.getElementById('resumeForm');
const educationContainer = document.getElementById('educationContainer');
const experienceContainer = document.getElementById('experienceContainer');
const projectContainer = document.getElementById('projectContainer');
const skillsContainer = document.getElementById('skillsContainer');

function addInput(container, placeholder) {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;
  input.className = 'dynamic-input';
  container.appendChild(input);
  updatePreview();
}

document.getElementById('addEducation').addEventListener('click', () => {
  addInput(educationContainer, 'Enter education details');
});

document.getElementById('addExperience').addEventListener('click', () => {
  addInput(experienceContainer, 'Enter experience details');
});

document.getElementById('addProject').addEventListener('click', () => {
  addInput(projectContainer, 'Enter project details');
});

document.getElementById('addSkillButton').addEventListener('click', () => {
  const newSkill = document.getElementById('newSkill').value.trim();
  if (newSkill) {
    createSkillChip(newSkill);
    document.getElementById('newSkill').value = '';
    updatePreview();
  }
});

// Toggle default skill selection
skillsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('skill-chip')) {
    e.target.classList.toggle('selected');
    updatePreview();
  }
});

function createSkillChip(skill) {
  const chip = document.createElement('span');
  chip.className = 'skill-chip selected';
  chip.textContent = skill;
  chip.dataset.skill = skill;
  skillsContainer.appendChild(chip);
  updatePreview();
}

function updatePreview() {
  document.getElementById('resumeName').textContent = form.name.value;
  document.getElementById('resumeEmail').textContent = form.email.value;
  document.getElementById('resumePhone').textContent = form.phone.value;
  document.getElementById('resumeSummary').textContent = form.summary.value;

  updateList(educationContainer, 'resumeEducation');
  updateList(experienceContainer, 'resumeExperience');
  updateList(projectContainer, 'resumeProjects');
  updateSkillsPreview();
}

function updateList(container, previewId) {
  const preview = document.getElementById(previewId);
  preview.innerHTML = '';
  container.querySelectorAll('.dynamic-input').forEach((input) => {
    if (input.value.trim()) {
      const li = document.createElement('li');
      li.textContent = input.value;
      preview.appendChild(li);
    }
  });
}

function updateSkillsPreview() {
  const resumeSkills = document.getElementById('resumeSkills');
  resumeSkills.innerHTML = '';
  skillsContainer.querySelectorAll('.skill-chip.selected').forEach((chip) => {
    const li = document.createElement('li');
    li.textContent = chip.dataset.skill;
    resumeSkills.appendChild(li);
  });
}

form.addEventListener('input', updatePreview);

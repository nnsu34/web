// 층별로 보여줄 인원 데이터를 미리 설정
const personnelData = {
  '1F': [
    { name: '박지운', role: '학생', department: 'AI소프트웨어', logs: [
        { timeStart: '08:30', location: '2F' },
        { timeStart: '10:00', location: '1F' }
      ] 
    },
    { name: '곽지훈', role: '학생', department: 'AI소프트웨어', logs: [
        { timeStart: '09:30', location: '2F' },
        { timeStart: '11:00', location: '1F' }
      ] 
    },
    { name: '신수현', role: '학생', department: 'AI소프트웨어', logs: [
        { timeStart: '08:45', location: '2F' },
        { timeStart: '11:30', location: '1F' }
      ] 
    },
    { name: '김정헌', role: '교수', department: 'AI소프트웨어', logs: [
        { timeStart: '09:00', location: '2F' },
        { timeStart: '12:00', location: '1F' }
      ] 
    }
  ],
  '2F': [
    { name: '정영도', role: '학생', department: 'AI소프트웨어', logs: [
        { timeStart: '08:45', location: '1F' },
        { timeStart: '10:30', location: '2F' }
      ] 
    },
    { name: '박다운', role: '학생', department: 'AI소프트웨어', logs: [
        { timeStart: '09:00', location: '1F' },
        { timeStart: '11:30', location: '2F' }
      ] 
    },
    { name: '문병현', role: '학생', department: 'AI소프트웨어', logs: [
        { timeStart: '09:15', location: '1F' },
        { timeStart: '12:30', location: '2F' }
      ] 
    }
  ]
};

// 현재 선택된 층
let selectedFloor = '1F';

// 요소 선택
const floor1Btn = document.getElementById('floor1Btn');
const floor2Btn = document.getElementById('floor2Btn');
const personnelTitle = document.getElementById('personnelTitle');
const personnelList = document.getElementById('personnelList');

// 초기 화면 설정
updatePersonnelList();

// 층 버튼 클릭 시 이벤트 핸들러
floor1Btn.addEventListener('click', () => {
  selectedFloor = '1F';
  updatePersonnelList();
  toggleSelectedButton(floor1Btn, floor2Btn);
});

floor2Btn.addEventListener('click', () => {
  selectedFloor = '2F';
  updatePersonnelList();
  toggleSelectedButton(floor2Btn, floor1Btn);
});

// 인원 리스트 업데이트 함수
function updatePersonnelList() {
  personnelList.innerHTML = ''; // 기존 리스트 제거
  personnelData[selectedFloor].forEach((person, index) => {
    const listItem = document.createElement('li');
    
    const personInfo = document.createElement('div');
    personInfo.className = 'person-info';
    personInfo.innerHTML = `
      <div class="profile-icon-bg" onclick="toggleAccordion('timeLog${index}')"> <!-- 클릭 시 아코디언 토글 -->
        <i class="fas fa-user profile-icon"></i>
      </div>
      <div class="details">
        <strong>${person.name}</strong>
        <small>${person.department} ${person.role}</small>
      </div>
    `;
    
    const timeLog = document.createElement('div');
    timeLog.className = 'time-log accordion open'; // 기본적으로 열려있도록 설정

    person.logs.slice().reverse().forEach((log, logIndex) => {
      const logEntry = document.createElement('div');
      logEntry.className = `time-log-entry ${logIndex > 0 ? 'old' : ''}`;
      logEntry.innerHTML = `
        <div class="time">${log.timeStart}</div>
        <div class="line"></div>
        <div class="location">${log.location}</div>
      `;
      timeLog.appendChild(logEntry);
    });

    listItem.appendChild(personInfo);
    listItem.appendChild(timeLog);
    personnelList.appendChild(listItem);
  });
}

// 선택된 버튼 스타일 토글 함수
function toggleSelectedButton(selected, other) {
  selected.classList.add('selected');
  other.classList.remove('selected');
}

// 아코디언 섹션 열기/닫기
function toggleAccordion(sectionId) {
  const section = document.getElementById(sectionId);
  const icon = section.previousElementSibling.querySelector('.title-icon');

  section.classList.toggle('open');
  icon.classList.toggle('open');
}

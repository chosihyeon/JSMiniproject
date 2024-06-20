// 로컬 스토리지에서 사전을 초기화하거나, 사용 가능하지 않으면 빈 객체로 초기화합니다.
let dictionary = JSON.parse(localStorage.getItem('glossary')) || {};

// 새로운 단어와 그 설명을 사전에 추가하는 함수
function addWord() {
    const word = document.getElementById('newWord').value.trim();
    const description = document.getElementById('newDescription').value.trim();

    // 단어와 설명이 모두 제공되었는지 확인합니다.
    if (word && description) {
        // 대소문자 구분 없이 검색하기 위해 단어를 소문자로 저장합니다.
        dictionary[word.toLowerCase()] = description;
        // 업데이트된 사전을 로컬 스토리지에 저장합니다.
        localStorage.setItem('glossary', JSON.stringify(dictionary));
        // 입력 필드를 초기화합니다.
        document.getElementById('newWord').value = '';
        document.getElementById('newDescription').value = '';
        alert('단어가 성공적으로 추가되었습니다!');
    } else {
        alert('단어와 설명을 모두 입력해주세요.');
    }
}

// 사전에서 단어를 검색하고 설명을 표시하는 함수
function searchWord() {
    const word = document.getElementById('searchWord').value.trim().toLowerCase();
    const result = document.getElementById('result');

    // 사전에 단어가 존재하는지 확인합니다.
    if (word in dictionary) {
        result.textContent = `${word}: ${dictionary[word]}`;
    } else {
        result.textContent = '단어를 찾을 수 없습니다.';
    }
}

// 검색 입력 필드에 키가 눌릴 때 검색을 트리거하는 이벤트 리스너
document.getElementById('searchWord').addEventListener('keyup', searchWord);
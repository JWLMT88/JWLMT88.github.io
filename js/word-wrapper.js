function searchInFile() {
    var searchTerm = prompt('Enter the word to search:');
    if (searchTerm === null) return;
    searchTerm = searchTerm.trim();
    if (searchTerm === '') return;

    var editorLines = document.querySelectorAll('.editor-line');
    var foundCount = 0;

    editorLines.forEach(function(line) {
        line.classList.remove('search-result');
        if (line.textContent.includes(searchTerm)) {
            line.classList.add('search-result');
            foundCount++;
        }
    });

    if (foundCount === 0) {
        alert('No matches found.');
    } else {
        alert('Found ' + foundCount + ' matches.');
    }
}

function openInTextEditor() {
    var editedContent = quill.root.innerHTML;
    var blob = new Blob([editedContent], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    window.location.assign(url);
}
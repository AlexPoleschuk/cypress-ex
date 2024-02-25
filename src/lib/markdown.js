import markdownit from 'markdown-it';

const md = markdownit();

const getResultsMarkdown = (results) => md.render(
    `| ✨Results✨  |
    | *Total*: | ${results.totalTests} |
    | *Passed*:  | ${results.totalPassed}; |
    | *Failed*: | ${results.totalFailed}; |
`);

export default getResultsMarkdown;

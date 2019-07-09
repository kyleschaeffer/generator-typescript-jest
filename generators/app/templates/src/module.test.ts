import { <%= className %> } from './<%= projectNameKebab %>';

test('<%= className %> is instantiated', () => {
  const <%= projectNameCamel %> = new <%= className %>();
  expect(<%= projectNameCamel %>).toBeInstanceOf(<%= className %>);
});

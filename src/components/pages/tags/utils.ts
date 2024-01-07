import type { TagApi } from 'types/tags'
import { SnakeCaseToCamelCase } from 'types/utils'

function getSelectedTagsName(
  selectedTags: SnakeCaseToCamelCase<TagApi>[],
): SnakeCaseToCamelCase<TagApi>['tag'][] {
  if (selectedTags.length === 0) return []
  return selectedTags.map(selectedTag => {
    return selectedTag.tag
  })
}

export { getSelectedTagsName }

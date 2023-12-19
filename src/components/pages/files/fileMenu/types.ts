import type { MouseEvent } from 'react'

/* eslint-disable @typescript-eslint/no-namespace */
namespace ActionTypes {
  export type HandleClickFavorite = {
    e: MouseEvent<HTMLButtonElement>
    id: number
    onFavoriteClick: (id: number) => void
  }

  export type HandleClickDetails = {
    e: MouseEvent<HTMLButtonElement>
    handleChangeDrawerTab: (value: number) => void
    toggleDrawer: () => void
  }

  export type HandleClickComment = {
    e: MouseEvent<HTMLLIElement>
    handleDrawerOpen: () => void
    handleChangeDrawerTab: (value: number) => void
    closeMenu: (e: MouseEvent<HTMLLIElement>) => void
  }

  export type HandleClickTag = {
    e: MouseEvent<HTMLLIElement>
    handleDrawerOpen: () => void
    handleChangeDrawerTab: (value: number) => void
    closeMenu: (e: MouseEvent<HTMLLIElement>) => void
  }

  export type HandleClickRename = {
    e: MouseEvent<HTMLLIElement>
    closeMenu: (e: MouseEvent<HTMLLIElement>) => void
  }

  export type HandleClickDownload = {
    e: MouseEvent<HTMLLIElement>
    closeMenu: (e: MouseEvent<HTMLLIElement>) => void
  }

  export type HandleClickDelete = {
    e: MouseEvent<HTMLLIElement>
    closeMenu: (e: MouseEvent<HTMLLIElement>) => void
  }

  export type HandleClickRestore = {
    e: MouseEvent<HTMLLIElement>
    closeMenu: (e: MouseEvent<HTMLLIElement>) => void
  }

  export type HandleClickRemove = {
    e: MouseEvent<HTMLLIElement>
    closeMenu: (e: MouseEvent<HTMLLIElement>) => void
  }
}

export default ActionTypes

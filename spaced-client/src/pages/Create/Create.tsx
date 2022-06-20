import { Button, Menu } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Adjustments, BrandStackoverflow, Eye } from "tabler-icons-react";
import Controllers from "./Controllers";
import Overview from "../../shared/components/Overview/Overview";
import Preview from "../../shared/components/Preview/Preview";
import { useAppSelector } from "../../redux/store";
import AppHeader from "../../shared/components/AppHeader/AppHeader";
import { useCreate } from "../../shared/hooks/useCreate";
import { DeckType } from "../../shared/types/deck";
import Details from "./Details";
import {
  CreateAdditionalOptions,
  CreateContainer,
  TextEditorsContainer,
} from "./Styles";
import TextEditor from "../../shared/components/TextEditor/TextEditor";
import { DeckBtnCircular } from "../../shared/components/Decks/DeckBtn";

function Create({ details }: { details?: DeckType }) {
  const {
    front,
    setFront,
    back,
    setBack,
    curr,
    deck,
    addCard,
    previousCard,
    nextCard,
    deleteCard,
    saveDeck,
    title,
    desc,
    setDesc,
    setTitle,
    setCurr,
    count,
    setCount,
    handleDaySelect,
    daySelect,
    jumpHandler,
    overviewOpened,
    previewOpened,
    setOverviewOpened,
    setPreviewOpened,
    openOverview,
    openPreview,
  } = useCreate(details!);

  const navigate = useNavigate();
  const api = useAppSelector((state) => state.api);

  const saveHandler = async () => {
    if (details) {
      await saveDeck(details.id);
    } else {
      await saveDeck("");
    }
    navigate("/u/home");
  };

  return (
    <>
      <AppHeader
        appProps={{
          headerName: details ? "Edit" : "Create",
          displayBack: true,
        }}
      />
      <CreateContainer>
        {curr !== -1 && (
          <>
            <TextEditorsContainer>
              <Overview
                appProps={{
                  overviewOpened,
                  setOverviewOpened,
                  jumpHandler,
                  deck,
                }}
              />
              <Preview
                appProps={{
                  previewOpened,
                  setPreviewOpened,
                  details: {
                    title: "",
                    id: "",
                    desc: "",
                    cards: deck,
                    count: 0,
                    rrule: "",
                  },
                }}
              />
              <TextEditor
                isFront={true}
                text={front}
                debounceFunction={setFront}
              />
              <TextEditor
                isFront={false}
                text={back}
                debounceFunction={setBack}
              />
            </TextEditorsContainer>
            <Controllers
              appProps={{
                deleteCard,
                previousCard,
                curr,
                deck,
                addCard,
                nextCard,
              }}
            />
            <CreateAdditionalOptions>
              <Button
                data-id="create-save-btn"
                onClick={() => saveHandler()}
                loading={api.loading === "pending"}
              >
                Save
              </Button>
              <Menu
                data-id="create-open-addoptions-btn"
                position="top"
                control={<DeckBtnCircular control={<Adjustments />} />}
              >
                <Menu.Item
                  data-id="create-open-overview-btn"
                  onClick={() => openOverview()}
                  icon={<BrandStackoverflow size={24} />}
                >
                  Overview
                </Menu.Item>
                <Menu.Item
                  data-id="create-open-preview-btn"
                  onClick={() => openPreview()}
                  icon={<Eye size={24} />}
                >
                  Preview
                </Menu.Item>
              </Menu>
            </CreateAdditionalOptions>
          </>
        )}
        {curr === -1 && (
          <>
            <Details
              appProps={{
                daySelect,
                title,
                setTitle,
                desc,
                setDesc,
                setCurr,
                handleDaySelect,
                count,
                setCount,
              }}
            />
          </>
        )}
      </CreateContainer>
    </>
  );
}

export default Create;

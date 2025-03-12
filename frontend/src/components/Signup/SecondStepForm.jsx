import React from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ModalHeader from "../ModalHeader/ModalHeader.jsx";
import FormInput from "../FormInput.jsx";
import AvatarUploader from "../AvatarUploader.jsx";
import ActionButton from "../ActionButton/ActionButton.jsx";

export default function SecondStepForm({
  error,
  preview,
  setPreview,
  fullNameRef,
  majorRef,
  imageInputRef,
  handleSubmit,
  onClose,
  setNextForm,
  setImage,
  setError,
  loading,
  style,
}) {
  const { t } = useTranslation();
  return (
    <div style={style}>
      <ModalHeader
        title={t("auth.signUp")}
        renderArrowBack={true}
        onBack={() => setNextForm(false)}
        onClose={onClose}
      />
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="avatar">
            <AvatarUploader
              preview={preview}
              setPreview={setPreview}
              imageInputRef={imageInputRef}
              setImage={setImage}
              setError={setError}
            />
          </Form.Group>

          <FormInput
            id={"fullName"}
            type={"text"}
            placeholder={t("auth.fullName")}
            ref={fullNameRef}
            required
          />

          {/* <Form.Group id="major">
            <select
              id="major"
              style={{ width: "100%" }}
              className="input_enter for-text mt-2 mt-xl-3  mb-3 mb-sm-2 "
              ref={majorRef}
              required
            >
              <option value="">Оберіть спеціальність</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
              <option value="parrot">Parrot</option>
              <option value="spider">Spider</option>
              <option value="goldfish">Goldfish</option>
              <option value="Chervanchuk">Chervanchuk</option>
            </select>
          </Form.Group> */}
          <ActionButton
            label={t("auth.register")}
            loading={loading}
            className="my-5"
          />
        </Form>
      </Card.Body>
    </div>
  );
}

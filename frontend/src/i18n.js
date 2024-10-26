import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "Classes": "Classes"
        }
    },
    pt: {
        translation: {
            "Classes": "Turmas",
            "Your Classes": "As suas Turmas",
            "View Students": "Ver Alunos",
            "Add Student": "Adicionar Aluno",
            "Adding...": "A adicionar...",
            "Categories": "Categorias",
            "Students": "Alunos",
            "View Grades": "Ver aprendizagens",
            "Failed to fetch data!" : "Falha ao obter dados!",
            "Failed to fetch students": "Falha ao obter alunos",
            "Failed to load students": "Falha ao carregar alunos",
            "Failed to fetch classes": "Falha ao obter turmas",
            "Failed to load classes": "Falha ao carregar turmas",
            "Failed to fetch grades": "Falha ao obter aprendizagens",
            "Failed to load data": "Falha ao carregar dados",
            "Grade updated successfully": "Aprendizagem atualizada com sucesso",
            "Failed to update grade": "Falha ao atualizar aprendizagem",
            "Loading...": "A carregar...",
            "Retry": "Tentar novamente",
            "Grade updated!" : "Aprendizagem atualizada!",
            "Failed to update grade!" : "Falha ao atualizar aprendizagem!",
            "Failed to load data. Please try again." : "Falha ao carregar dados. Por favor, tente novamente.",
            "Cancel": "Cancelar",
            "Student Name": "Nome do Aluno",
            "Add New Student": "Adicionar Novo Aluno",
            "Grade Matrix": "Aprendizagens Essenciais",
            "Grades": "Aprendizagens Essenciais"
        }
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "pt", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;